import { model, Schema, Document } from "mongoose";
import { UserRoleEnum } from "../interfaces";

export interface Iuser extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRoleEnum;
}

const userSchema = new Schema<Iuser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
        },

        role: {
            type: String,
            enum: Object.values(UserRoleEnum),
            default: UserRoleEnum.CUSTOMER,
        },
    },
    {
        timestamps: true,
    }
);

export const User = model<Iuser>("User", userSchema);
