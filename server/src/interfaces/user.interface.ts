import {DiseaseInterface} from "./disease.interface";
import {HealthInterface} from "./health.interface";
import {CoordinateInterface} from "./coordinate.interface";

export interface UserInterface {
     id?: string;
     email: string;
     password: string;
     phone: string;

     health?: HealthInterface;
    disease?: DiseaseInterface[];

     coordinate: CoordinateInterface;
}
