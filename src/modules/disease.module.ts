import { Module } from '@nestjs/common';
import {DiseaseController} from "../controllers/disease.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {DiseaseSchema} from "../schemas/disease.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: 'DiseaseCard', schema: DiseaseSchema}])],
    controllers: [DiseaseController],
    providers: [],
})
export class DiseaseModule {}
