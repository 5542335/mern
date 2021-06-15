import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { RolesModule } from './roles/roles.module';
import { ProfileModule } from './modules/profile/profile.module';

require('dotenv').config();

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pubyr.mongodb.net/mongo?retryWrites=true&w=majority`,
    ),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AuthModule,
    RolesModule,
    ProfileModule,
  ],
  providers: [AuthService],
})
export class AppModule {}
