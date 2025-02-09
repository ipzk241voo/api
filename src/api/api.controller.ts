import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiService } from './api.service';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtaAthGuard } from 'src/auth/jwt/jwtauth.guard';


@Controller('api')
@UseGuards(JwtaAthGuard, RolesGuard)
export class ApiController {
    constructor(
        private readonly apiService: ApiService
    ) { }

    @Get([
        "products",
        "products/:productId"
    ])
    @Roles("USER")
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
    @Roles("ADMIN")
    async createProduct(
        @Body() data: any
    ) {
        return this.apiService.createProduct(data);
    }

    @Patch("products/:productId")
    @Roles("ADMIN")
    async updateProduct(
        @Param("productId") productId: string,
        @Body() data: any
    ) {
        return this.apiService.updateProduct(productId, data);
    }

    @Delete("product/:productId")
    @Roles("ADMIN")
    async deleteProduct(
        @Param("productId") productId: string
    ) {
        return this.apiService.deleteProduct(productId)
    }
}
