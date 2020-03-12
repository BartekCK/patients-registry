import {Body, Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {AuthService} from "../services/auth.service";
import {AuthGuard} from "@nestjs/passport";
import {SignInDto} from "../dto/signDto";
import {LocalAuthGuard} from "../auth/local-auth.guard";


@ApiTags('login')
@Controller('login')
export class LoginController {
    constructor(private readonly authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Body()loginDto: SignInDto) {
        return this.authService.login(loginDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req): string {
        return req.user;
    }
}
