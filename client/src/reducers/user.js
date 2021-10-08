export const user = (state = null, action) => {
  if (action.type === 'user') {
    return action.payload;
  }

  return state;
};
