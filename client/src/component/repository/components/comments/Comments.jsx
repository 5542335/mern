import React, { useCallback, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';

import { Message } from '../message/Message';
import './comments.css';

// const x = (y) => () => alert(y);

export const Comments = ({ repoId }) => {
  const socketRef = useRef(null);
  const message = useRef(null);
  const [showButtons, setShowButtons] = useState(false);
  const [enableBtn, setEnableBtn] = useState(true);
  const [showCommentLine, setShowCommentLine] = useState(false);
  const [comments, setComments] = useState([]);

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
      },
    });

    socketRef.current = socket;

    socket.on('getComments', (data) => {
      setComments(data);
    });

    socket.on('receiveComment', (data) => {
      setComments((prevComments) => [data, ...prevComments]);
    });

    // TODO: make delay for state update
    // socket.on('receiveLike', (comment) => {
    //
    // });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendComment = useCallback((event) => {
    const cookies = new Cookies();
    const token = cookies.get('token');

    event.preventDefault();
    socketRef.current.emit('sendComment', {
      body: `${message.current.value}`,
      repoId,
      timestamp: Date.now(),
      token,
    });
    setShowCommentLine(false);
    setShowButtons(false);
    message.current.value = '';
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

  return (
    <div>
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

      <div>
        {comments.map((comment) => (
          <Message
            author={comment.authorName}
            body={comment.body}
            numberOfLikes={comment.numberOfLikes}
            numberOfDislikes={comment.numberOfDislikes}
            timestamp={comment.timestamp}
            // onClick={comment.body}
          />
        ))}
      </div>
    </div>
  );
};

Comments.propTypes = {
  repoId: PropTypes.string.isRequired,
};
