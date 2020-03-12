import {HealthDto} from "./health.dto";
import {DiseaseDto} from "./disease.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsEmail, IsNumber, IsString} from "class-validator";

class HelpDto {

    @ApiProperty({
        default: false
    })
    @IsBoolean()
    helpMe: boolean;

    @ApiProperty()
    @IsNumber()
    xCoordinate: number;

    @ApiProperty()
    @IsNumber()
    yCoordinate: number;
}


export class UserDto {

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    health?: HealthDto;

    @ApiProperty({
        type: [DiseaseDto],
    })
    disease?: DiseaseDto[];

    @ApiProperty()
    helpInf?: HelpDto;
}
