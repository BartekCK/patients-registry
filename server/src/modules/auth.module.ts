import {Module} from '@nestjs/common';
import {UserModule} from "./user.module";
import {PassportModule} from "@nestjs/passport";
import {jwtConstants} from "../helpers/constants";
import {AuthService} from "../services/auth.service";
import {LocalStrategy} from "../auth/local.strategy";
import {JwtStrategy} from "../auth/jwt.strategy";
import {JwtModule} from '@nestjs/jwt';

@Module({
    imports: [UserModule,
        PassportModule.register({defaultStrategy: 'jwt', session: false}),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '60000s'},
        })],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {
}
