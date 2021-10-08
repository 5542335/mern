import React, { useCallback, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Message } from '../message/Message';
import './comments.css';

const limitCount = 5;

export const Comments = ({ repoId }) => {
  const tokenStore = useSelector((state) => state.token);
  const socketRef = useRef(null);
  const message = useRef(null);
  const [showButtons, setShowButtons] = useState(false);
  const [enableBtn, setEnableBtn] = useState(true);
  const [showCommentLine, setShowCommentLine] = useState(false);
  const [comments, setComments] = useState([]);
  const [skipCount, setSkipCount] = useState(limitCount);
  const [hasMore, setHasMore] = useState(true);

  const commentFocus = useCallback(() => {
    setShowButtons(true);
    setShowCommentLine(true);
  }, []);

  const handleCancelBtn = useCallback(() => {
    setShowButtons(false);
    message.current.value = '';
    setShowCommentLine(false);
  }, []);

  useEffect(() => {
    const socket = io('ws://localhost:5000/', {
      query: {
        repoId,
        token: tokenStore || '',
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

    // TODO: make delay for state update
    // socket.on('receiveLike', (comment) => {
    // });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendComment = useCallback((event) => {
    event.preventDefault();
    socketRef.current.emit('sendComment', {
      body: `${message.current.value}`,
      repoId,
      timestamp: Date.now(),
      token: tokenStore,
    });
    setShowCommentLine(false);
    setShowButtons(false);
    message.current.value = '';
  }, []);

  const sendLike = useCallback((commentId, isLike, isDislike) => {
    socketRef.current.emit(`sendLike`, {
      commentId,
      isDislike,
      isLike,
      repoId,
      token: tokenStore,
    });
  }, []);

  const sendDislike = useCallback((commentId, isLike, isDislike) => {
    socketRef.current.emit('sendDislike', {
      commentId,
      isDislike,
      isLike,
      repoId,
      token: tokenStore,
    });
  }, []);

  const commentStroke = useCallback((event) => {
    const currMessage = event.target.value;

    if (currMessage) {
      setEnableBtn(false);
    } else {
      setEnableBtn(true);
    }

    setShowCommentLine(true);
  }, []);

  const fetchData = useCallback(() => {
    socketRef.current.emit('loadComment', {
      limitCount,
      repoId,
      skipCount,
      token: tokenStore,
    });
    setSkipCount(skipCount + limitCount);
  }, [skipCount]);

  return (
    <div>
      {tokenStore ? (
        <form noValidate>
          <textarea
            rows={4}
            ref={message}
            onFocus={commentFocus}
            onKeyUp={commentStroke}
            type="text"
            placeholder="Напишите комментарий..."
          />
          {showCommentLine ? <div className="commentLine" /> : false}
          {showButtons && (
            <>
              <button type="submit" className="commentButton sendButton" disabled={enableBtn} onClick={sendComment}>
                Отправить
              </button>
              <button
                type="button"
                className="commentButton"
                style={{ backgroundColor: 'transparent', color: 'gray' }}
                onClick={handleCancelBtn}
              >
                Отмена
              </button>
            </>
          )}
        </form>
      ) : (
        <h5>
          <NavLink to="/auth">Войдите</NavLink> или <NavLink to="/register">зарегистрируйтесь</NavLink> для того, чтобы
          оставлять комментарии.
        </h5>
      )}

      <div>
        <InfiniteScroll
          dataLength={comments.length} // This is important field to render the next data
          next={fetchData}
          hasMore={hasMore}
          loader={comments.length ? <h4>Loading...</h4> : <h4>Нет комментариев</h4>}
          endMessage={
            comments.length ? (
              <p style={{ textAlign: 'center' }}>
                <b>Закончились (</b>
              </p>
            ) : (
              <h4>Нет комментариев</h4>
            )
          }
        >
          {comments.map(
            ({ _id, authorName, body, numberOfDislikes, timestamp, isLiked, isDisliked, numberOfLikes }) => (
              <Message
                author={authorName}
                body={body}
                numberOfDislikes={numberOfDislikes}
                numberOfLikes={numberOfLikes}
                timestamp={timestamp}
                commentId={_id}
                sendLike={sendLike}
                sendDislike={sendDislike}
                isLiked={isLiked}
                isDisliked={isDisliked}
              />
            ),
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

Comments.propTypes = {
  repoId: PropTypes.string.isRequired,
};
