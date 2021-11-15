import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useTextArea } from '../hooks/useTextArea';
import { useSocket } from '../hooks/useSocket';
import { CustomButton } from '../../../shared/buttons/CustomButton';
import { Message } from '../message/Message';
import './comments.css';

export const Comments = () => {
  const { token } = useSelector((state) => state);
  const {
    message,
    showButtons,
    enableBtn,
    showCommentLine,
    commentFocus,
    handleCancelBtn,
    commentStroke,
    setShowCommentLine,
    setShowButtons,
  } = useTextArea();
  const { comments, hasMore, sendComment, fetchData, sendLike, sendDislike } = useSocket(
    message,
    setShowCommentLine,
    setShowButtons,
  );

  return (
    <div>
      {token ? (
        <form noValidate>
          <textarea
            rows={4}
            ref={message}
            onFocus={commentFocus}
            onKeyUp={commentStroke}
            type="text"
            placeholder="Напишите комментарий..."
          />
          {showCommentLine && <div className="commentLine" />}
          {showButtons && (
            <>
              <CustomButton htmlType="submit" disabled={enableBtn} onClick={sendComment}>
                Отправить
              </CustomButton>
              <CustomButton type="secondary" onClick={handleCancelBtn}>
                Отмена
              </CustomButton>
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
          dataLength={comments.length}
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
