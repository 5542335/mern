import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      `mongodb+srv://Alexey:kbj3q1gz@cluster0.pubyr.mongodb.net/mongo?retryWrites=true&w=majority`,
    ),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}
