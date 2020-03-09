import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {HealthSchema} from "../schemas/health.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: 'HealthCard', schema: HealthSchema}])],
    controllers: [],
    providers: [],
})

export class HealthModule {
}
