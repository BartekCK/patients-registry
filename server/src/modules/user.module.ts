import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../schemas/user.schema";
import {UserService} from "../services/user.service";
import {UserController} from "../controllers/user.controller";
import {DiseaseModule} from "./disease.module";
import {HealthService} from "../services/health.service";
import {HealthController} from "../controllers/health.controller";
import {CoordinateController} from "../controllers/coordinate.controller";
import {CoordinateService} from "../services/coordinate.service";

@Module({
    imports: [
        DiseaseModule,
        MongooseModule.forFeature([{name: "users", schema: UserSchema}])
    ],
    controllers: [UserController, HealthController, CoordinateController],
    providers: [UserService, HealthService, CoordinateService],
    exports: [UserService]
})
export class UserModule {
}
