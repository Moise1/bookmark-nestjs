import {Injectable, ConflictException, HttpStatus, HttpException} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaOpsService } from 'src/prisma-ops/prisma-ops.service';
import { AuthDto } from './dto';
@Injectable()
export class AuthService {
  constructor(
    private prismaOpsService: PrismaOpsService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(body: AuthDto) {
    try {
      const user = await this.prismaOpsService.user.findUnique({
        where: { email: body.email }
      });

      if (!user) throw new HttpException('Sorry! User not found.', HttpStatus.NOT_FOUND)

      const pswdMatch = await argon.verify(user.hash, body.password);
      
      if (!pswdMatch) throw new HttpException('Sorry! Incorrect creds.', HttpStatus.BAD_REQUEST);
      
      return {
          message: 'Successfully logged in',
          token: await this.signToken(user.id, user.email)
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
    }
  }

 

  async register(body: AuthDto) {
    try {
      const hash = await argon.hash(body.password);
      const user = await this.prismaOpsService.user.create({
        data: {
          email: body.email,
          hash,
        },
      });
      return {
        message: 'Account created successfully',
        token: await this.signToken(user.id, user.email)
    };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') throw new ConflictException('Email already taken.');
        throw error;
      }
    }
  }

  async signToken(userId: number, email: string): Promise<string>{
    const payload = {userId,email};
    return await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: this.config.get('JWT_SECRET')
    })
  }

}

// Stopped at 1:47:17
