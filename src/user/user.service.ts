import { Injectable } from '@nestjs/common';
import { PrismaOpsService } from '../prisma-ops/prisma-ops.service';
import { EditUserDto } from './dto/editUser.dto';

@Injectable()
export class UserService {
    constructor(private prismaOpsService: PrismaOpsService){}
    
    async editUser(userId: any, body: EditUserDto){
        const user = await this.prismaOpsService.user.update({
            where: {id: userId.id},
            data: {...body}
        });
        return user;
    }
}
