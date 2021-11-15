import Cookies from 'universal-cookie';
import { push } from 'connected-react-router';

import { alertAction } from '../alert/index';
import { updateToken } from './actionTypes';
import { HttpService } from '../../../services/HttpService';

const cookies = new Cookies();
const httpService = new HttpService();

export const register = (values) => async (dispatch) => {
  try {
    const response = await httpService.post('/api/auth/registration', JSON.stringify(values));

    if (response) {
      const { token } = response;

      cookies.set('token', token);
      dispatch({ payload: token, type: updateToken });
      dispatch(push('/'));
    }
  } catch {
    dispatch(alertAction('Что-то пошло не так', true, 'error'));
  }
};

export const login = (values) => async (dispatch) => {
  try {
    const response = await httpService.post('/api/auth/login', JSON.stringify(values));

    if (response) {
      const { token } = response;

      cookies.set('token', token);
      dispatch({ payload: token, type: updateToken });
      dispatch(push('/'));
    }
  } catch {
    dispatch(alertAction('Что-то пошло не так', true, 'error'));
  }
};
