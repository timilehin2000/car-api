import { Schema, model, Document, Types } from "mongoose";

export interface ICar extends Document {
    brand: string;
    carModel: string;
    year: number;
    price: number;
    category: Types.ObjectId;
    isAvailable: boolean;
    color?: string;
    mileage?: number;
}

const CarSchema = new Schema<ICar>(
    {
        brand: {
            type: String,
            required: true,
        },

        year: {
            type: Number,
            required: true,
        },

        carModel: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        isAvailable: {
            type: Boolean,
            default: true,
        },

        color: {
            type: String,
        },

        mileage: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

export const Car = model<ICar>("Car", CarSchema);
