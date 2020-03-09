import {Module} from '@nestjs/common';
import {AppController} from '../controllers/app.controller';
import {AppService} from '../services/app.service';
import {DiseaseModule} from "./disease.module";
import {MongooseModule} from '@nestjs/mongoose';
import {UserModule} from "./user.module";
import {HealthModule} from "./health.module";

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost:27017/register',
        {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}),
        DiseaseModule,
        UserModule,
        HealthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
