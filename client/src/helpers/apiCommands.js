import { get, getSafe, post, postSafe, putSafe } from './api';
import * as routes from '../helpers/routes';

export const getAllDiseases = () => get(routes.diseasesApi());
export const getAllDiseasesCoordinates = () =>
  get(routes.diseasesCoordinatesApi());

export const getUserInformation = () => getSafe(routes.userApi());
export const putUserInformation = (body) => putSafe(routes.userApi(), body);

export const singUp = (body) => post(routes.userApi(), body);
export const signIn = (body) => post(routes.loginApi(), body);

export const postHealthInf = (body) => postSafe(routes.userHealthApi(), body);

export const getUserDiseases = () => getSafe(routes.userDiseasesApi());
export const postUserDiseases = (body) =>
  postSafe(routes.userDiseasesApi(), body);
