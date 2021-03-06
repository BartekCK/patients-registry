import {Module} from '@nestjs/common';
import {DiseaseModule} from "./disease.module";
import {MongooseModule} from '@nestjs/mongoose';
import {UserModule} from "./user.module";
import {AuthModule} from "./auth.module";
import {LoginController} from "../controllers/login.controller";
import {credentials} from "../credentials";

@Module({
    imports: [MongooseModule.forRoot(`mongodb+srv://${credentials}@registrydb-gawja.mongodb.net/registry?retryWrites=true&w=majority`,
        {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}),
        DiseaseModule,
        UserModule,
        AuthModule
    ],
    controllers: [LoginController],
})
export class AppModule {
}
