import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import {AuthModule} from './auth/auth.module';
import { PrismaOpsModule } from './prisma-ops/prisma-ops.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule, PrismaOpsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
