import { Module } from '@nestjs/common';
import {DiseaseController} from "../controllers/disease.controller";

@Module({
    imports: [],
    controllers: [DiseaseController],
    providers: [],
})
export class DiseaseModule {}
