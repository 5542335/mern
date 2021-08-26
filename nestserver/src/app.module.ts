import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { EventsModule } from './modules/events/events.module';
import { LikedRepoModule } from './modules/likedRepo/likedRepo.module';
// import { RolesModule } from './roles/roles.module';

require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pubyr.mongodb.net/mongo?retryWrites=true&w=majority`
    ),
    UserModule,
    LikedRepoModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AuthModule,
    EventsModule,
  ],
})
export class AppModule {}
