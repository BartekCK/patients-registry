import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNumber} from "class-validator";

export class CoordinateDto {

    @ApiProperty({
        default: false
    })
    @IsBoolean()
    helpMe?: boolean;

    @ApiProperty()
    @IsNumber()
    xCoordinate: number;

    @ApiProperty()
    @IsNumber()
    yCoordinate: number;
}
