import { HttpService } from '../../../services/HttpService';
import { updateCollections } from './actionTypes';

const httpService = new HttpService();

export const getCollectionsAction = async (dispatch) => {
  const response = await httpService.get('api/collections/getCollections');

  dispatch({ payload: response, type: updateCollections });
};

export const deleteCollectionAction = (collectionName) => async (dispatch, getState) => {
  const { collections } = getState();
  const { user } = getState();
  const { _id: id } = user || {};
  const response = await httpService.delete('/api/collections/delete', JSON.stringify({ collectionName, userId: id }));

  const newCollections = { ...collections.allCollections };

  delete newCollections[response.collectionName];

  dispatch({ payload: newCollections, type: updateCollections });
};

export const createCollectionAction = (values) => async (dispatch, getState) => {
  const { collections } = getState();
  const { user } = getState();
  const { _id: id } = user || {};
  const response = await httpService.post('/api/collections/create', JSON.stringify({ ...values, userId: id }));

  const newCollections = { ...collections.allCollections };

  newCollections[response.collectionName] = [response.repoIds];

  dispatch({ payload: newCollections, type: updateCollections });
};

export const addCollectionsAction = (selectedCollections, selectedRepo) => async (_, getState) => {
  const collectionsForSendStr = selectedCollections.join(',');
  const { user } = getState();
  const { _id: id } = user || {};

  try {
    const response = await httpService.put(
      '/api/collections/addCollections',
      JSON.stringify({
        collectionName: collectionsForSendStr,
        repoId: selectedRepo?.node.id,
        userId: id,
      }),
    );

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
