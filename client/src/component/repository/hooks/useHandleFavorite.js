import { useState, useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { HttpService } from '../../../services/HttpService';

const httpService = new HttpService();

export const useHandleFavorite = (data) => {
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const values = useMemo(() => ({ repositoryId: data?.repository.id, token }), [data?.repository.id, token]);

  const [heart, setHeart] = useState(null);

  const fetchLikeRepo = useCallback(
    async (path, heartState) => {
      setHeart(heartState);
      await httpService.patch(`/api/user/${path}`, JSON.stringify(values));
    },
    [values],
  );

  const handleHeartClickLike = useCallback(async () => {
    if (heart) {
      fetchLikeRepo('dislike', false);
    } else {
      fetchLikeRepo('like', true);
    }
  }, [fetchLikeRepo, heart]);

  useEffect(() => {
    if (data && token) {
      const fetchLike = async () => {
        const response = await dispatch(() => httpService.post('/api/user/getLike', JSON.stringify(values)), {
          alertOptions: {},
        });

        if (response.liked) {
          setHeart(true);
        }
      };

      fetchLike();
    }
  }, [token, data, dispatch, values]);

  return { handleHeartClickLike, heart };
};
