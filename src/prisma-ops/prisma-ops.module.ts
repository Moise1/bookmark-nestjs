import { Global, Module } from '@nestjs/common';
import { PrismaOpsService } from './prisma-ops.service';

@Global() //This module is use globally in the app.
@Module({
  providers: [PrismaOpsService],
  exports: [PrismaOpsService]
})
export class PrismaOpsModule {}
