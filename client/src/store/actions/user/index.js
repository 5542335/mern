import { updateUser } from './actionTypes';
import { alertAction } from '../alert/index';
import { HttpService } from '../../../services/HttpService';

const httpService = new HttpService();

export const updateUserAction = async (dispatch, getState) => {
  const { token } = getState();

  if (token) {
    const response = await httpService.get('api/user');

    dispatch({ payload: response, type: updateUser });
  }
};

export const updateUserProfileAction = (values, initialValues) => async (dispatch, getState) => {
  const { user } = getState();
  const isEmptyObject = (object) => !Object.keys(object).length;
  const { _id: id } = user || {};

  const getObjectsDiff = (object1, object2) => {
    const result = {};

    Object.entries(object1).forEach(([key, value]) => {
      if (typeof value === 'object' && typeof object2[key] === 'object') {
        const objectsDiff = getObjectsDiff(value, object2[key]);

        if (!isEmptyObject(objectsDiff)) {
          result[key] = getObjectsDiff(value, object2[key]);
        }
      } else if (value !== object2[key]) {
        result[key] = object2[key];
      }
    });

    return result;
  };
  const patchUserDto = getObjectsDiff(initialValues, values);
  const response = await httpService.patch(`/api/user/editUser/${id}`, JSON.stringify(patchUserDto));

  if (response) {
    dispatch({ payload: response, type: updateUser });
    dispatch(alertAction('Данные изменены', true, 'success'));
  }
};

export const updateUserPasswordAction = (values) => async (dispatch, getState) => {
  const { user } = getState();
  const { _id: id } = user || {};

  const response = await httpService.patch(`/api/user/${id}/change-password`, JSON.stringify(values));

  if (response) {
    dispatch(alertAction('Пароль изменен', true, 'success'));
  }
};

export const uploadAvatarAction = (url) => async (dispatch, getState) => {
  const { user } = getState();
  const response = await httpService.patch('/api/user/change-avatar', JSON.stringify({ avatar: url }));

  if (response) {
    dispatch({ payload: { ...user, avatar: url }, type: updateUser });
    dispatch(alertAction('Аватар изменен', true, 'success'));
  }
};
