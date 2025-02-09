import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiService } from './api/api.service';
import { ApiController } from './api/api.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './database/Product';

import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),

    MongooseModule.forRoot("mongodb://127.0.0.1:27017/test", {
      connectionName: "test",
      onConnectionCreate: (connection) => {
        connection.on("connected", () =>
          new Logger("API MongoDB").log(`Connected`)
        );
      }
    }),

    MongooseModule.forFeature([
      { name: "product", schema: ProductSchema }
    ], "test"),
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class AppModule { }
