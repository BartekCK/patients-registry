import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {UserInterface} from "../interfaces/user.interface";
import {SignUpDto} from "../dto/signDto";
import {errorDbHandling, errorHandling} from "../helpers/errors";
import {DiseaseDto} from "../dto/disease.dto";
import {DiseaseService} from "./disease.service";
import {DiseaseInterface} from "../interfaces/disease.interface";
import {UserDto} from "../dto/user.dto";


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

    async findOneById(userId: string): Promise<UserDto> {
        const temp: UserInterface = await this.user.findOne({_id: userId}).catch(errorDbHandling);
        errorHandling(temp, `User with id ${userId} not found `, HttpStatus.NOT_FOUND);
        temp.disease = await this.getAllUserDiseases(userId);
        return temp;
    }

    async updateUserDiseases(userId: string, diseasesDtoArray: DiseaseDto[]): Promise<DiseaseDto[]> {
        try {
            await this.deleteUserDiseasesList(userId);
            for (const diseaseDto of diseasesDtoArray) {
                const diseaseFind: DiseaseInterface = await this.diseaseService.findDiseases(diseaseDto);
                await this.user.updateOne({_id: userId}, {$addToSet: {disease: diseaseFind}})
            }
            return this.getAllUserDiseases(userId);
        } catch (e) {
            errorDbHandling(e)
        }
        return null;
    }

    async getAllUserDiseases(userId: string): Promise<DiseaseDto[]> {
        const {disease} = await this.user.findOne({_id: userId}, 'disease').catch(errorDbHandling);
        const temp: DiseaseDto[] = [];
        for (let D of disease) {
            temp.push(await this.diseaseService.findDiseasesById(D));
        }
        return temp;
    }

    private async deleteUserDiseasesList(userId: string) {
        await this.user.updateOne({_id: userId}, {$set: {disease: []}}).catch(errorDbHandling);
    }


}
