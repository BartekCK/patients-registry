import {Injectable} from '@nestjs/common';
import {SignInDto} from "../dto/signDto";
import {JwtService} from '@nestjs/jwt';
import {UserService} from "./user.service";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
                private readonly jwtService: JwtService,
    ) {
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if (user && user.password === pass) {
            return user;//should I return without password
        }
        return null;
    }

    async login(loginDto: SignInDto) {
        const user = await this.validateUser(loginDto.username, loginDto.password);
        const payload = {username: user.email, sub: user._id};
        return {
            access_token: this.jwtService.sign(payload),
            coordinateInformation: user.coordinateInformation
        };
    }

    // async decode(token: string): Promise<UserInterface> {
    //     const Credentials: any = this.jwtService.decode(token.substring(7, token.length));
    //     return await this.userService.findOneById(Credentials.sub);
    // }
}
