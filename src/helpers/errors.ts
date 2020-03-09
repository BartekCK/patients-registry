import {HttpException, HttpStatus} from "@nestjs/common";

export const errorHandling = (toCheck: any, message: string, httpStatus: HttpStatus) => {
    if (!toCheck || toCheck.length <= 0)
        throw new HttpException(message, httpStatus);
};

export const errorDbHandling = (err: any) => {
    throw new HttpException(err.message, HttpStatus.NOT_ACCEPTABLE);
};
