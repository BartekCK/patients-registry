import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {AuthService} from "../../services/auth.service";

@Injectable()
export class PermitGuard implements CanActivate {
    constructor(private readonly reflector: Reflector,
                private readonly auth: AuthService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = await this.auth.decode(request.headers.authorization);

        //const hasScope = () => user.roles.some((role) => roles.includes(role.toString()));

        // return user && user.roles && hasScope();
        console.log('PERMITGUARD');
        return user!==null;
    }

}
