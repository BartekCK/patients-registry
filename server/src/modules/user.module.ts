import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../schemas/user.schema";
import {UserService} from "../services/user.service";
import {UserController} from "../controllers/user.controller";
import {DiseaseModule} from "./disease.module";
import {HealthService} from "../services/health.service";
import {HealthController} from "../controllers/health.controller";

@Module({
    imports: [DiseaseModule, MongooseModule.forFeature([{name: 'users', schema: UserSchema}])],
    controllers: [UserController, HealthController],
    providers: [UserService, HealthService],
    exports: [UserService]
})

export class UserModule {
}
