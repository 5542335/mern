import { useState, useCallback, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const limitCount = 5;

export const useSocket = (message, setShowCommentLine, setShowButtons) => {
  const { token } = useSelector((state) => state);
  const { currentRepository } = useSelector((state) => state.repositories);
  const socketRef = useRef(null);
  const [skipCount, setSkipCount] = useState(limitCount);
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const socket = io('ws://localhost:5000/', {
      query: {
        repoId: currentRepository.repository.id,
        token: token || '',
      },
    });

    socketRef.current = socket;

    socket.on('getComments', (data) => {
      setComments(data);
    });

    socket.on('receiveComment', (data) => {
      setComments((prevComments) => [data, ...prevComments]);
    });

    socket.on('returnLoadComment', (data) => {
      if (!data.length) {
        setHasMore(false);
      } else {
        setHasMore(true);
        setComments((prevComments) => [...prevComments, ...data]);
      }
    });

    socket.on(`receiveLike`, (data) => {
      setComments((prevComments) => {
        // eslint-disable-next-line no-underscore-dangle
        const commentId = prevComments.findIndex(({ _id: id }) => data._id === id);

        // eslint-disable-next-line no-param-reassign
        prevComments[commentId] = data;

        return [...prevComments];
      });
    });

    socket.on('receiveDislike', (data) => {
      setComments((prevComments) => {
        // eslint-disable-next-line no-underscore-dangle
        const commentId = prevComments.findIndex(({ _id: id }) => data._id === id);

        // eslint-disable-next-line no-param-reassign
        prevComments[commentId] = data;

        return [...prevComments];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [currentRepository, token]);

  const sendComment = useCallback(
    (event) => {
      event.preventDefault();
      socketRef.current.emit('sendComment', {
        body: `${message.current.value}`,
        repoId: currentRepository.repository.id,
        timestamp: Date.now(),
        token,
      });
      setShowCommentLine(false);
      setShowButtons(false);
      // eslint-disable-next-line
      message.current.value = '';
    },
    [currentRepository, token, message, setShowCommentLine, setShowButtons],
  );

  const sendLike = useCallback(
    (commentId, isLike, isDislike) => {
      socketRef.current.emit(`sendLike`, {
        commentId,
        isDislike,
        isLike,
        repoId: currentRepository.repository.id,
        token,
      });
    },
    [currentRepository, token],
  );

  const sendDislike = useCallback(
    (commentId, isLike, isDislike) => {
      socketRef.current.emit('sendDislike', {
        commentId,
        isDislike,
        isLike,
        repoId: currentRepository.repository.id,
        token,
      });
    },
    [currentRepository, token],
  );

  const fetchData = useCallback(() => {
    socketRef.current.emit('loadComment', {
      limitCount,
      repoId: currentRepository.repository.id,
      skipCount,
      token,
    });
    setSkipCount(skipCount + limitCount);
  }, [skipCount, currentRepository, token]);

  return { comments, fetchData, hasMore, sendComment, sendDislike, sendLike };
};
