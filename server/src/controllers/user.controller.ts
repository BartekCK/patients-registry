import {Body, Controller, Get, Post, Put, Request, UseGuards} from "@nestjs/common";
import {UserDto} from "../dto/user.dto";
import {ApiBearerAuth, ApiBody, ApiTags} from "@nestjs/swagger";
import {UserService} from "../services/user.service";
import {SignUpDto} from "../dto/signDto";
import {AuthGuard} from "@nestjs/passport";
import {DiseaseDto} from "../dto/disease.dto";

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

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put()
    async updateUser(@Request() req, @Body() userDto: SignUpDto): Promise<UserDto> {
        return this.userService.updateUser(req.user.userId, userDto);
    }

    @ApiBearerAuth()
    @ApiBody({type: [DiseaseDto]})
    @UseGuards(AuthGuard('jwt'))
    @Post('diseases')
    async addDiseases(@Request() req, @Body() diseasesDtoArray: DiseaseDto[]): Promise<DiseaseDto[]> {
        return this.userService.updateUserDiseases(req.user.userId, diseasesDtoArray);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('diseases')
    async getAllUserDiseases(@Request() req): Promise<DiseaseDto[]> {
        return this.userService.getAllUserDiseases(req.user.userId);
    }


}
