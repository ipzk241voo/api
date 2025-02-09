import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: { username: string; password: string }) {
        const user = await this.authService.validateUser(loginDto.username, loginDto.password);
        if (!user) {
            return { message: 'Invalid credentials' };
        }
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() registerDto: { username: string; password: string; roles: string[] }) {
        return this.authService.create(registerDto.username, registerDto.password, registerDto.roles);
    }
}
