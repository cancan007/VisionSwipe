import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { number } from 'joi';
import { PrimaryGeneratedColumn } from 'typeorm';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class User {
  //@Transform(({ value }) => value.toString())
  @PrimaryGeneratedColumn()
  id: string;

  @Prop({
    type: String,
    required: true,
  })
  firstName;

  @Prop({
    type: String,
    required: true,
  })
  lastName;

  fullName: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  username;

  @Prop({
    type: String,
    require: true,
    unique: true,
  })
  email;

  @Prop({
    type: String,
    require: true,
  })
  @Exclude()
  password;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('fullName').get(function (this: UserDocument) {
  return `${this.firstName} ${this.lastName}`;
});
