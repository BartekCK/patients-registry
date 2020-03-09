import { Injectable, UnauthorizedException } from '@nestjs/common';
import {LoginDto} from "../dto/login.dto";
import {UserInterface} from "../interfaces/user.interface";
import { JwtService } from '@nestjs/jwt';
import {UserService} from "./user.service";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
                private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user && user.password === pass) {
            return user;//should I return without password
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.username, loginDto.password);

        if (!user) {
            throw new UnauthorizedException();
        }
        const payload = { username: user.email, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async decode(token: string): Promise<UserInterface> {
        const Credentials: any = this.jwtService.decode(token.substring(7, token.length));
        return await this.userService.findOneById(Credentials.sub);
    }
}
