import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiService } from './api/api.service';
import { ApiController } from './api/api.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './database/Product';
import { UserSchema } from './database/User';

import configuration from './config/configuration';

import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),

    MongooseModule.forRoot("mongodb://127.0.0.1:27017/test", {
      onConnectionCreate: (connection) => {
        connection.on("connected", () =>
          new Logger("API MongoDB").log(`Connected`)
        );
      }
    }),

    MongooseModule.forFeature([
      { name: "user", schema: UserSchema },
      { name: "product", schema: ProductSchema }
    ]),

    PassportModule,
    JwtModule.register({
      secret: `ndpower2025`,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ApiController, AuthController],
  providers: [ApiService, JwtStrategy, AuthService],
  exports: [JwtModule]
})
export class AppModule { }
