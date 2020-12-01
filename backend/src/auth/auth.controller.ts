import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from 'src/shared/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private userService: UserService, private authService: AuthService) { }

    @Post('login')
    async login(@Body() userDTO: any) {

        const user = await this.userService.findByLogin(userDTO);

        const userInfo = {
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            userId: user._id
        }
        

        const payload = {
            userId: user._id,
            username: user.username
        }

        const token = await this.authService.signPayload(payload);

        return { userInfo, token };
    }

    @Post('register')
    async register(@Body() userDTO: any) {

        const user = await this.userService.create(userDTO);

        return { user }
    }


}
