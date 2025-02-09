import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserType } from "src/types/User";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements UserType {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, default: ["ADMIN"] })
    roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);