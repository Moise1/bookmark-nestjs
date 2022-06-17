import { Injectable } from "@nestjs/common";
import { PrismaOpsService } from "src/prisma-ops/prisma-ops.service";

@Injectable()
export class AuthService{
    constructor(private prismaOpsService: PrismaOpsService){}
    
    login(){
        return 'Logging in...'
    };

    register(){
        return 'Registering...'
    };

}
