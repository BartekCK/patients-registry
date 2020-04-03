import {DiseaseInterface} from "./disease.interface";
import {HealthInterface} from "./health.interface";
import {CoordinateInterface} from "./coordinate.interface";

export interface MapUserInterface {
     phone: string;
     health?: HealthInterface;
     disease?: DiseaseInterface[];
     coordinate: CoordinateInterface;
}
