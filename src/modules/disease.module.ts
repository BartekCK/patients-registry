import {Module} from '@nestjs/common';
import {DiseaseController} from "../controllers/disease.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {DiseaseSchema} from "../schemas/disease.schema";
import {DiseaseService} from "../services/disease.service";

@Module({
    imports: [MongooseModule.forFeature([{name: 'diseases', schema: DiseaseSchema}])],
    controllers: [DiseaseController],
    providers: [DiseaseService],
    exports: [DiseaseService]
})
export class DiseaseModule {
}
