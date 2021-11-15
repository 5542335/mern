import { updateAllUsers, blockUser } from './actionTypes';

export const updateAllUsersAction = async (dispatch, getState) => {
  const { token } = getState();

  if (token) {
    const userRaw = await fetch(`api/user/all?token=${token}`);
    const formatAllUsers = await userRaw.json();

    dispatch({ payload: formatAllUsers, type: updateAllUsers });
  }
};

export const blockUserAction = (selectedUser) => async (dispatch, getState) => {
  const { token } = getState();
  const { _id: id } = selectedUser || '';
  const response = await fetch(`api/user/blockUser?token=${token}`, {
    body: JSON.stringify({
      active: !selectedUser.active,
      userId: id,
    }),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    method: 'PATCH',
  });

  const blockedUser = await response.json();

  if (response.ok) {
    dispatch({ payload: blockedUser, type: blockUser });
  }
};
