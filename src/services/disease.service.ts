import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {DiseaseInterface} from "../interfaces/disease.interface";
import {DiseaseDto} from "../dto/disease.dto";
import {errorDbHandling, errorHandling} from "../helpers/errors";
import {UserInterface} from "../interfaces/user.interface";

@Injectable()
export class DiseaseService {
    constructor(@InjectModel('diseases') private readonly disease: Model<DiseaseInterface>) {
    }

    async addDisease(diseaseDto: DiseaseDto) {
        const createDisease = new this.disease(diseaseDto);
        return await createDisease.save().catch(errorDbHandling);
    }

    async getAllDiseases(): Promise<DiseaseDto[]> {
        const temp = await this.disease.find().catch(errorDbHandling);
        errorHandling(temp, 'I can not find any diseases', HttpStatus.NOT_FOUND);
        return temp;
    }

    async findDiseases(diseaseDto: DiseaseDto) : Promise<DiseaseInterface> {
        const temp: DiseaseInterface = await this.disease.findOne(diseaseDto).catch(errorDbHandling);
        errorHandling(temp, `Disease ${diseaseDto} don't exist in db `, HttpStatus.NOT_FOUND);
        return temp;
    }
}
