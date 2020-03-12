import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {UserInterface} from "../interfaces/user.interface";
import {HealthDto} from "../dto/health.dto";
import {UserService} from "./user.service";
import {errorDbHandling} from "../helpers/errors";

@Injectable()
export class HealthService {
    constructor(@InjectModel('users') private readonly user: Model<UserInterface>,
                private readonly userService: UserService) {
    }

    async addUserHealthInformation(userId: string, healthDto: HealthDto): Promise<HealthDto> {
        return this.user.updateOne({_id: userId}, {healthInformation: healthDto}).catch(errorDbHandling);
    }

}
