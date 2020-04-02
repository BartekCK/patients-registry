import {HealthDto} from "./health.dto";
import {DiseaseDto} from "./disease.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString} from "class-validator";
import {CoordinateDto} from "./coordinate.dto";


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
    coordinate?: CoordinateDto;
}
