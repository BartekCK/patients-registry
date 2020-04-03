import * as api from './api';
import {apiCoordinatesUrl, apiLoginUrl} from './routes';

export const loginUser = loginBody => api.post(apiLoginUrl(), loginBody);
export const addUserCoordinate = coordinateBody => api.post(apiCoordinatesUrl(), coordinateBody);
