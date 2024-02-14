import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as MSchema } from 'mongoose';

export type UserDocument = HydratedDocument<User> & Document;

@Schema({
  timestamps: true,
  _id: false,
})

export class User extends Document {
  @Prop({
    type: MSchema.Types.ObjectId,
    required: true,
  })
  _id: MSchema.Types.ObjectId;

  @Prop({ index: true, type: String, default: null })
  firstName: string;

  @Prop({ index: true, type: String, default: null })
  lastName: string;

  @Prop({ index: true, type: String, default: null })
  email: string;

  @Prop({
    type: Date,
    default: null,
  })
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
