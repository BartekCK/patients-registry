import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {UserInterface} from "../interfaces/user.interface";
import {UserService} from "./user.service";
import {CoordinateDto} from "../dto/coordinate.dto";
import {errorDbHandling} from "../helpers/errors";
import {MapUserInterface} from "../interfaces/mapUser.interface";


@Injectable()
export class CoordinateService {
    constructor(@InjectModel('users') private readonly user: Model<UserInterface>,
                private readonly userService: UserService) {
    }


    async updateUserCoordinate(userId: string, coordinateDto: CoordinateDto): Promise<CoordinateDto> {
        return this.user.updateOne({_id: userId}, {$set: {coordinateInformation: coordinateDto}}).catch(errorDbHandling);
    }

    getUserCoordinate(userId: string): Promise<CoordinateDto> {
        return this.user.findOne({_id: userId}, {coordinateInformation: true}).catch(errorDbHandling);

    }

    async getAllLocationsWithDiseases(): Promise<MapUserInterface[]> {//MOST IMPORTANT
        return await this.user.find().select('disease phone healthInformation coordinateInformation').populate('disease', 'kind');
    }
}
