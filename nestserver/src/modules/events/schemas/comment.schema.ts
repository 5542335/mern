import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  token: string;

  @Prop()
  authorName: string;

  @Prop()
  body: string;

  @Prop()
  repoId: string;

  @Prop()
  like: string[];

  @Prop()
  dislike: string[];

  @Prop()
  timestamp: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);