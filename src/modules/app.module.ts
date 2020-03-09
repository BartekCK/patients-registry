import {Module} from '@nestjs/common';
import {DiseaseModule} from "./disease.module";
import {MongooseModule} from '@nestjs/mongoose';
import {UserModule} from "./user.module";
import {HealthModule} from "./health.module";
import {AuthModule} from "./auth.module";
import {PermitGuard} from "../auth/permits/PermitGuard";
import {APP_GUARD} from "@nestjs/core";
import {LoginController} from "../controllers/login.controller";

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost:27017/register',
        {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}),
        DiseaseModule,
        UserModule,
        HealthModule,
        AuthModule
    ],
    controllers: [LoginController],
    providers: [{
        provide: APP_GUARD,
        useClass: PermitGuard,
    }],
})
export class AppModule {
}
