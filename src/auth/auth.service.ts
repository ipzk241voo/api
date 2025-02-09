import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { UserDocument } from 'src/database/User';
import { JwtPayload } from './jwt/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel("user") private userModel: Model<UserDocument>
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userModel.findOne({ username });
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user.toObject();
            return result;
        }
        return null;
    }

    async create(username: string, password: string, roles: string[]) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({ username, password: hashedPassword, roles });
        return newUser.save();
    }

    async login(user: any) {
        const payload: JwtPayload = { username: user.username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async hasRole(userId: string, role: string): Promise<boolean> {
        const user = await this.userModel.findOne({ _id: userId });
        return user?.roles.includes(role);
    }
}
