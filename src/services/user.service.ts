import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {UserInterface} from "../interfaces/user.interface";
import {SignUpDto} from "../dto/signDto";
import {errorDbHandling, errorHandling} from "../helpers/errors";


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly user: Model<UserInterface>) {
    }

    async create(userDto: SignUpDto): Promise<SignUpDto> {
        const createdUser = new this.user(userDto);
        return createdUser.save().catch(errorDbHandling);
    }

    async findOneByEmail(email: string): Promise<UserInterface> {
        const temp: UserInterface = await this.user.findOne({email: email}).catch(errorDbHandling);
        errorHandling(temp, `Email ${email} don't exist in db `, HttpStatus.NOT_FOUND);
        return temp;
    }

    async findOneById(userId: string): Promise<UserInterface> {
        const temp: UserInterface = await this.user.findOne({_id: userId}).catch(errorDbHandling);
        errorHandling(temp, `User with id ${userId} not found `, HttpStatus.NOT_FOUND);
        return temp;
    }
}
