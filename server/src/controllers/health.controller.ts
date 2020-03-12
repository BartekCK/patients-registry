import {Body, Controller, Post, Put, Request, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {HealthService} from "../services/health.service";
import {HealthDto} from "../dto/health.dto";
import {AuthGuard} from "@nestjs/passport";

@ApiTags('users/health')
@Controller('users/health')
export class HealthController {

    constructor(private readonly healthService: HealthService) {
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async addUserHealthInf(@Request() req, @Body() healthDto: HealthDto): Promise<HealthDto> {
        return this.healthService.addUserHealthInformation(req.user.userId, healthDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put()
    async updateUserHealthInf(@Request() req, @Body() healthDto: HealthDto): Promise<HealthDto> {
        return this.healthService.addUserHealthInformation(req.user.userId, healthDto);
    }

}
