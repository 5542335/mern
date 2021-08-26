import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import './message.css';

export const Message = ({ author, body, numberOfDislikes, numberOfLikes, timestamp, onClick }) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [likeCount, setLikeCount] = useState(numberOfLikes || 0);
  const [dislikeCount, setDislikeCount] = useState(numberOfDislikes || 0);

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
    if (!like) {
      setLikeCount(likeCount + 1);
      setLike(true);
    } else {
      setLikeCount(likeCount - 1);
      setLike(false);
    }

    if (!like && dislike) {
      setLikeCount(likeCount + 1);
      setLike(true);
      setDislike(false);
      setDislikeCount(dislikeCount - 1);
    }
  }, [likeCount, dislikeCount]);

  const handleDislikeButton = useCallback(() => {
    if (dislike === false) {
      setDislikeCount(dislikeCount + 1);
      setDislike(true);
    } else {
      setDislikeCount(dislikeCount - 1);
      setDislike(false);
    }

    if (dislike === false && like) {
      setDislikeCount(dislikeCount + 1);
      setDislike(true);
      setLike(false);
      setLikeCount(likeCount - 1);
    }
  }, [likeCount, dislikeCount]);

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
          <button type="button" className="likeButton" title="Нравится" onClick={handleLikeButton}>
            {like ? <ThumbUpIcon fontSize="small" /> : <ThumbUpOutlinedIcon fontSize="small" />}
          </button>
          {likeCount}
          <button type="button" className="dislikeButton" title="Не нравится" onClick={handleDislikeButton}>
            {dislike ? <ThumbDownIcon fontSize="small" /> : <ThumbDownOutlinedIcon fontSize="small" />}
          </button>
          {dislikeCount}
        </div>
      </div>
    </>
  );
};

Message.propTypes = {
  author: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  numberOfDislikes: PropTypes.number.isRequired,
  numberOfLikes: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  timestamp: PropTypes.number.isRequired,
};
