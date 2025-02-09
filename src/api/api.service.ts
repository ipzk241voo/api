import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/database/Product';
import { ProductType } from 'src/types/Product';

@Injectable()
export class ApiService {
    constructor(
        @InjectModel("product") private product: Model<Product>
    ) { }

    async getProduct(_id: string) {
        try {
            const getProduct = await this.product.findOne({ _id });
            if (!getProduct) {
                throw new BadRequestException(`Nothing found for your id [${_id}]!`)
            }
            return getProduct;
        } catch (err) {
            throw new BadRequestException(`Invalid ID format or unexpected error`, err.message);
        }
    }

    async getProductList(limit: number, page: number, selects?: Array<string>) {
        return this.product.find({}, selects, { limit, skip: (page * limit) });
    }

    async createProduct(product: any) {
        const allowedKeys = Object.keys(this.product.schema.obj) as (keyof ProductType)[];
        const extraKeys = Object.keys(product).filter(key => !allowedKeys.includes(key as keyof ProductType));

        if (Object.keys(product).length == 0) {
            throw new BadGatewayException("You have not specified any elements!", `Is not defined ${allowedKeys.toString()}!`)
        }

        if (extraKeys.length > 0) {
            throw new BadRequestException(`The object contains invalid fields: ${extraKeys.join(', ')}`);
        }

        const created = new this.product(product);
        const validate = created.validateSync();

        if (validate?.errors) {
            throw new BadRequestException(validate.message)
        }

        return created.save();
    }

    async updateProduct(
        _id: string,
        data: ProductType
    ) {
        const allowedKeys = Object.keys(this.product.schema.obj) as (keyof ProductType)[];

        const keys = Object.keys(data)
        const extraKeys = keys.filter(key => !allowedKeys.includes(key as keyof ProductType));

        if (extraKeys.length > 0) {
            throw new BadRequestException(`The object contains invalid fields: ${extraKeys.join(', ')}`);
        }

        const getElement = await this.product.findOne({ _id });
        if (!getElement) {
            throw new BadRequestException(`Nothing found for your id [${_id}]!`)
        }

        for (const key of keys) {
            const validate = getElement.set(key, data[key]).validateSync();
            if (validate?.errors) {
                throw new BadGatewayException(validate.message)
            }
        }

        return getElement.save();
    }

    async deleteProduct(
        _id: string
    ) {
        try {
            if (!_id) {
                throw new BadRequestException(`Product ID is required.`);
            }
            const getProduct = await this.product.exists({ _id }).catch(err => err);
            if (!getProduct) {
                throw new BadRequestException(`Product _id: [${_id}] is not defined!`)
            }
            await this.product.deleteOne({ _id });
            return { message: "ok" }
        } catch (err) { 
            throw new BadRequestException(`Invalid ID format or unexpected error`, err.message);
        }
    }
}
