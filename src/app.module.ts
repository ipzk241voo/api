import { Logger, Module } from '@nestjs/common';
import { ApiService } from './api/api.service';
import { ApiController } from './api/api.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/test", {
      connectionName: "test",
      onConnectionCreate: (connection) => {
        connection.on("connected", () =>
          new Logger("API MongoDB").log(`Connected`)
        );
      }
    }),
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class AppModule { }
