import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type likedRepoDocument = likedRepo & Document;

@Schema()
export class likedRepo {
  @Prop()
  userEmail: string;

  @Prop()
  likedRepositories: string[];

}

export const LikedRepoSchema = SchemaFactory.createForClass(likedRepo);