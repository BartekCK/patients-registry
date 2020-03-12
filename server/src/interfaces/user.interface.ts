import {DiseaseInterface} from "./disease.interface";
import {HealthInterface} from "./health.interface";

export interface UserInterface {
    readonly id?: string;
    readonly email: string;
    readonly password: string;
    readonly phone: string;

    readonly health?: HealthInterface;
    disease?: DiseaseInterface[];

    readonly helpMe?: boolean;
    readonly xCoordinate?: number;
    readonly yCoordinate?: number;
}
