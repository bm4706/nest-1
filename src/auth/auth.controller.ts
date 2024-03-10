import { Body, Controller, Post, Req } from "@nestjs/common";
import { Response, Request } from 'express';
import { AuthService } from "./auth.service";
import { UserDTO } from "./dto/user.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/register')
    async registerAccount(@Req() req: Request, @Body() userDTO: UserDTO): Promise<any> {
        return await this.authService.registerUser(userDTO);
    }

    // 로그인 모듈 추가
    @Post('/login')
    async login(@Body() userDTO: UserDTO): Promise<any> {
        return await this.authService.validateUser(userDTO);
    }
}