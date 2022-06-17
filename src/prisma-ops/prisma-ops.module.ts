import { Global, Module } from '@nestjs/common';
import { PrismaOpsService } from './prisma-ops.service';

@Global()
@Module({
  providers: [PrismaOpsService],
  exports: [PrismaOpsService]
})
export class PrismaOpsModule {}
