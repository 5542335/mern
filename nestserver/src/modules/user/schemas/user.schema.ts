import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  acceptedTerms: boolean;
  id: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
