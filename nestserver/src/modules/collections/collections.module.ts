import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { Collect, CollectSchema } from './schema/collections.schema';

require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Collect.name, schema: CollectSchema }]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [CollectionsService],
  exports: [CollectionsService],
  controllers: [CollectionsController],
})
export class CollectionsModule {}
