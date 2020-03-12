import {IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class HealthDto {

    @ApiProperty()
    @IsString()
    emergencyNumber?: string;

    @ApiProperty()
    @IsString()
    @MaxLength(255)
    howHelp?: string;

    @ApiProperty()
    @IsString()
    @MaxLength(255)
    notDo?: string;
}
