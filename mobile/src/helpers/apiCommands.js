import * as api from './api';
import {apiLoginUrl} from './routes';

export const loginUser = loginBody => api.post(apiLoginUrl(), loginBody);
