import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ProductType } from "src/types/Product";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product implements ProductType {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true})
    price: number;

    @Prop({ required: true })
    discount: number;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    short_description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);