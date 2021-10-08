import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CollectDocument = Collect & Document;

@Schema()
export class Collect {
  @Prop()
  userId: string;

  @Prop()
  collectionName: string;

  @Prop()
  repoIds: string[];

  @Prop()
  mark: boolean;

  id: string;
}

export const CollectSchema = SchemaFactory.createForClass(Collect);
