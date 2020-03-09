import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {UserInterface} from "../interfaces/user.interface";
import {UserDto} from "../dto/user.dto";


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserInterface>) {}

    async create(userDto: UserDto): Promise<UserDto> {// HANDLE ERROR
        const createdUser = new this.userModel(userDto);
        return createdUser.save();
    }

    async findOne(email: string): Promise<UserInterface> {// HANDLE ERROR
        return await this.userModel.findOne({email: email});
    }

    async findOneById(userId: string): Promise<UserInterface> {// HANDLE ERROR
        const user: UserInterface = await this.userModel.findOne({_id: userId});
        if (!user) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }
        return user;
    }
}
