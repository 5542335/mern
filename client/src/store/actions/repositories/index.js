import { HttpService } from '../../../services/HttpService';
import { updateLikedRepoIds } from './actionTypes';

const httpService = new HttpService({ 'Access-Control-Allow-Origin': '*' });

export const deleteRepoFromCollectionAction = (pathName, body, id) => async (dispatch, getState) => {
  const { collections, repositories } = getState();
  const response = await httpService.patch(pathName, JSON.stringify(body));

  if (response) {
    const selectedCard = collections.collectionRepositories?.nodes.find((item) => item.id === id);
    const newLikedRepoIds = [...repositories.likedRepoIds];
    const index = newLikedRepoIds.indexOf(selectedCard?.id);

    newLikedRepoIds.splice(index, 1);
    dispatch({ payload: newLikedRepoIds, type: updateLikedRepoIds });
  }
};

export const getLikedRepoIdsAction = async (dispatch) => {
  const response = await httpService.get('api/user/getLikedRepoIds');

  dispatch({ payload: response, type: updateLikedRepoIds });
};

export const fetchLikeRepoAction = (path, id) => async (dispatch, getState) => {
  const { token } = getState();
  const { repositories } = getState();
  const response = await httpService.patch(`/api/user/${path}`, JSON.stringify({ repositoryId: id, token }));

  const payload = () => {
    if (path === 'like') {
      return [...repositories.likedRepoIds, response];
    }

    const newLikedRepoIds = [...repositories.likedRepoIds];
    const index = newLikedRepoIds.indexOf(response);

    newLikedRepoIds.splice(index, 1);

    return newLikedRepoIds;
  };

  dispatch({ payload, type: updateLikedRepoIds });
};
