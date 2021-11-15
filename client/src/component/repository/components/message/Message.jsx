import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import { useSelector } from 'react-redux';
import './message.css';

export const Message = ({
  author,
  body,
  timestamp,
  onClick,
  commentId,
  sendLike,
  sendDislike,
  isLiked,
  isDisliked,
  numberOfLikes,
  numberOfDislikes,
}) => {
  const { token } = useSelector((state) => state);
  const convertTime = (unixTime) =>
    new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      month: 'numeric',
      second: 'numeric',
      year: 'numeric',
    }).format(unixTime);

  const handleLikeButton = useCallback(() => {
    sendLike(commentId, isLiked, isDisliked);
  }, [commentId, isLiked, isDisliked, sendLike]);

  const handleDislikeButton = useCallback(() => {
    sendDislike(commentId, isLiked, isDisliked);
  }, [commentId, isLiked, isDisliked, sendDislike]);

  return (
    <>
      <div className="messageContainer" onClick={onClick}>
        <div className="FIcon">
          <FaceIcon fontSize="large" />
        </div>
        <div className="authorAndTime">
          <div>
            <Chip label={author} size="small" />
          </div>
          <div className="time">{convertTime(timestamp)}</div>
        </div>
        <div className="messageBody">{body}</div>
        <div className="messageIconsContainer">
          {token ? (
            <button type="button" className="likeButton" title="Нравится" onClick={handleLikeButton}>
              {isLiked ? <ThumbUpIcon fontSize="small" /> : <ThumbUpOutlinedIcon fontSize="small" />}
            </button>
          ) : (
            <button type="button" className="likeButton" disabled title="Необходимо авторизоваться">
              {isLiked ? <ThumbUpIcon fontSize="small" /> : <ThumbUpOutlinedIcon fontSize="small" />}
            </button>
          )}
          {numberOfLikes}
          {token ? (
            <button type="button" className="dislikeButton" title="Не нравится" onClick={handleDislikeButton}>
              {isDisliked ? <ThumbDownIcon fontSize="small" /> : <ThumbDownOutlinedIcon fontSize="small" />}
            </button>
          ) : (
            <button type="button" className="dislikeButton" disabled title="Необходимо авторизоваться">
              {isDisliked ? <ThumbDownIcon fontSize="small" /> : <ThumbDownOutlinedIcon fontSize="small" />}
            </button>
          )}
          {numberOfDislikes}
        </div>
      </div>
    </>
  );
};

Message.propTypes = {
  author: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  isDisliked: PropTypes.bool.isRequired,
  isLiked: PropTypes.bool.isRequired,
  numberOfDislikes: PropTypes.number.isRequired,
  numberOfLikes: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  sendDislike: PropTypes.func.isRequired,
  sendLike: PropTypes.func.isRequired,
  timestamp: PropTypes.number.isRequired,
};
