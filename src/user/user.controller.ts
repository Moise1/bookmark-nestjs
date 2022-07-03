import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/custom-decorator/get-user.dec';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto/editUser.dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    constructor(private userService: UserService){};
    @Get('me')
    getMe(@GetUser() user: User){
        return user;
    };

    @Patch('edit')
    editUser(
        @GetUser('id') userId: number, 
        @Body() body: EditUserDto
    ){
        return this.userService.editUser(userId, body);
    }
}
