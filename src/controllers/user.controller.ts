import {Body, Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import {UserDto} from "../dto/user.dto";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {UserService} from "../services/user.service";
import {SignUpDto} from "../dto/signDto";
import {AuthGuard} from "@nestjs/passport";

@ApiTags('users')
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @Post()
    async createUser(@Body() userDto: SignUpDto): Promise<UserDto> {
        return this.userService.create(userDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUser(@Request() req): Promise<UserDto> {
        return this.userService.findOneById(req.user.userId);
    }


}
