import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString} from 'class-validator';

export class SignInDto {
    @ApiProperty()
    @IsEmail()
    username: string;//This is email but I use default passport local ...

    @ApiProperty()
    @IsString()
    password: string;
}


export class SignUpDto {

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    phone: string;
}
