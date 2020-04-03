import {Body, Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {CoordinateDto} from "../dto/coordinate.dto";
import {CoordinateService} from "../services/coordinate.service";
import {MapUserInterface} from "../interfaces/mapUser.interface";

@ApiTags('users/coordinates')
@Controller('users/coordinates')
export class CoordinateController {

    constructor(private readonly coordinateService: CoordinateService) {
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async addUserLocation(@Request() req, @Body()coordinateDto: CoordinateDto): Promise<CoordinateDto> {
        return this.coordinateService.updateUserCoordinate(req.user.userId, coordinateDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUserLocation(@Request() req): Promise<CoordinateDto> {
        return this.coordinateService.getUserCoordinate(req.user.userId);
    }


    @Get('/all')
    async getAllLocationsWithDiseases(): Promise<MapUserInterface[]> {
        return this.coordinateService.getAllLocationsWithDiseases();
    }


}
