import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
    constructor(
        private readonly apiService: ApiService
    ) { }

    @Get([
        "products",
        "products/:productId"
    ])
    async products(
        @Param("productId") productId: string,
        @Body("selects") selects?: Array<string>,
        @Query("limit") limit?: number,
        @Query("page") page?: number
    ) {
        if (productId) {
            return this.apiService.getProduct(productId)
        }
        return this.apiService.getProductList(limit, page, selects);
    }

    @Post("products")
    async createProduct(
        @Body("product") data: any
    ) {
        return this.apiService.createProduct(data);
    }

    @Patch("products/:productId")
    async updateProduct(
        @Param("productId") productId: string,
        @Body() data: any
    ) {
        return this.apiService.updateProduct(productId, data);
    }

    @Delete("product/:productId")
    async deleteProduct(
        @Param("productId") productId: string
    ) {
        return this.deleteProduct(productId)
    }
}
