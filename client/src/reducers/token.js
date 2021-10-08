import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const token = (state = cookies.get('token') || null, action) => {
  if (action.type === 'token') {
    return action.payload;
  }

  return state;
};
