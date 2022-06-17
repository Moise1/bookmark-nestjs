import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaOpsService extends PrismaClient {
    constructor(){
        super({
            datasources: {
                db: {
                    url: 'postgresql://postgres:123@localhost:5432/nest?schema=public'
                }
            }
        })
    }
}
