import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import {AuthModule} from './auth/auth.module';
import { PrismaOpsModule } from './prisma-ops/prisma-ops.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    UserModule, 
    BookmarkModule, 
    PrismaOpsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
