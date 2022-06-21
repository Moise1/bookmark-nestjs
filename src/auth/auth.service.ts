import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon from 'argon2';
import { PrismaOpsService } from "src/prisma-ops/prisma-ops.service";
import { AuthDto } from "./dto";
@Injectable()
export class AuthService{
    constructor(private prismaOpsService: PrismaOpsService){}
    
    async login(body: AuthDto){
        try {
            const user = await this.prismaOpsService.user.findUnique({
                where: { email: body.email}
            });

            console.log('THE LOGGED IN USER', user);
            if(!user){
                throw new ForbiddenException('Sorry! Creds are incorrect.');
            }

            const pswdMatch = await argon.verify(user.hash, body.password);

            if(!pswdMatch) throw new ForbiddenException('Sorry! Creds are incorrect.');

            return user;
        } catch (error) {
            
        }
    };

    async register(body: AuthDto){
       try {
        const hash =  await argon.hash(body.password);
        const user = await this.prismaOpsService.user.create({
            data: {
                email: body.email,
                hash
            },
        })
        return user;
       } catch (error) {
           if(error instanceof PrismaClientKnownRequestError){
               if(error.code === 'P2002') throw new ForbiddenException('Creds already taken.');
               throw error;

           };
       }
    };

}

// Stopped at 1:17:00