import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikedRepoController } from './likedRepo.controller';
import { LikedRepoService } from './likedRepo.service';
import { likedRepo, LikedRepoSchema } from './schemas/likedRepo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: likedRepo.name, schema: LikedRepoSchema }])
  ],
  providers: [LikedRepoService],
  exports: [],
  controllers: [LikedRepoController],
})
export class LikedRepoModule {}