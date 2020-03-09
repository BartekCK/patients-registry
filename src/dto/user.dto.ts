import {HealthDto} from "./health.dto";
import {DiseaseDto} from "./disease.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString} from "class-validator";


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

    health?: HealthDto;

    disease?: DiseaseDto[];
}
