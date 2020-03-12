import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class DiseaseDto {

    @ApiProperty()
    @IsString()
    type: string;

    @ApiProperty()
    @IsString()
    kind: string;

}
