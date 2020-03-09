
export interface DiseaseInterface {
    readonly id?:string;
    readonly type: string;
    readonly kind: string;

    readonly helpMe: boolean;
    readonly xCoordinate: number;
    readonly yCoordinate: number;
}
