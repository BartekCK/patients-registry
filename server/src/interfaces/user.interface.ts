import {DiseaseInterface} from "./disease.interface";
import {HealthInterface} from "./health.interface";
import {CoordinateInterface} from "./coordinate.interface";

export interface UserInterface {
    readonly id?: string;
    readonly email: string;
    readonly password: string;
    readonly phone: string;

    readonly health?: HealthInterface;
    disease?: DiseaseInterface[];

    readonly coordinate: CoordinateInterface;
}
