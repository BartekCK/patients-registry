import {Body, Controller, Get, Post} from "@nestjs/common";
import {UserDto} from "../dto/user.dto";
import {ApiTags} from "@nestjs/swagger";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";

@ApiTags('users')
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() userDto: UserDto): Promise <UserDto> {
        return this.userService.create(userDto);
    }
}
