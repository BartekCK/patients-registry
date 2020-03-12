import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {UserInterface} from "../interfaces/user.interface";
import {SignUpDto} from "../dto/signDto";
import {errorDbHandling, errorHandling} from "../helpers/errors";
import {DiseaseDto} from "../dto/disease.dto";
import {UserDto} from "../dto/user.dto";
import {DiseaseService} from "./disease.service";
import {DiseaseInterface} from "../interfaces/disease.interface";


@Injectable()
export class UserService {
    constructor(@InjectModel('users') private readonly user: Model<UserInterface>,
                private readonly diseaseService: DiseaseService) {
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

    async addDiseases(userId: string, diseasesDtoArray: DiseaseDto[]): Promise<UserDto> {
        const temp: UserInterface = await this.findOneById(userId);
        const arr:any[] = [];
        for (const diseaseDto of diseasesDtoArray) {
            const disease: DiseaseInterface = await this.diseaseService.findDiseases(diseaseDto);
            //temp.disease.push(disease);
            arr.push(disease);
        }
        this.user.updateOne({_id: userId},{$addToSet:{disease: arr}});
        return this.updateUser(userId, temp);
    }

    async updateUser(userId: string, userInterface: UserInterface): Promise<UserDto> {
        return await this.user.updateOne({_id: userId}, userInterface).catch(errorDbHandling);
    }


}
