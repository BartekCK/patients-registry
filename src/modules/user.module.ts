import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../schemas/user.schema";
import {UserService} from "../services/user.service";
import {UserController} from "../controllers/user.controller";
import {DiseaseModule} from "./disease.module";

@Module({
    imports: [DiseaseModule, MongooseModule.forFeature([{name: 'users', schema: UserSchema}])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule {
}
