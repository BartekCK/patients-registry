import {Controller, Get, Post} from '@nestjs/common';
import * as DiseasesJSON from '../data/diseases.json'
import {ApiTags} from "@nestjs/swagger";
import {DiseaseService} from "../services/disease.service";

@ApiTags('diseases')
@Controller('/diseases')
export class DiseaseController {

    constructor(private readonly diseaseService: DiseaseService) {
    }

    @Get()
    async getDiseases() {
        return this.diseaseService.getAllDiseases();
    }

    @Post()//Add ROLES
    async addDisease() {
        let arr: any[] = DiseasesJSON.diseases;
        arr.forEach(diseases => {
            diseases.kind.forEach((kind) => {
                this.diseaseService.addDisease({type: diseases.type, kind: kind})
            })
        });
    }
}
