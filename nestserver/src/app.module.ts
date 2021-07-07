import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { RolesModule } from './roles/roles.module';
import { UserService } from './modules/user/user.service';

require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pubyr.mongodb.net/mongo?retryWrites=true&w=majority`,
    ),
    UserModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AuthModule,
    RolesModule,
  ],
  providers: [AuthService, UserService],
})
export class AppModule {}
