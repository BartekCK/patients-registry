import { Controller, Get } from '@nestjs/common';
import * as DiseasesJSON from '../data/diseases.json'

@Controller('/diseases')
export class DiseaseController {

    @Get()
    getDiseases() {
        return DiseasesJSON;
    }
}
