import React, { useState } from 'react';
import Reply from './Reply';
import css from './Comment.module.scss';

function Comment({ commentObj }) {
  const [replyOpenState, setReplyOpenState] = useState(commentObj.lastComment);
  const changeReplyOpenState = () => {
    setReplyOpenState(!replyOpenState);
  };

  return (
    <>
      <div
        className={css.comment}
        style={{
          marginLeft: commentObj.depth === 2 && '54px',
          width: commentObj.depth === 2 && '770px',
        }}
      >
        <div className={css.commentMarginDiv}>
          <div
            className={css.leftArea}
            style={{
              width: commentObj.depth === 2 && '680px',
            }}
          >
            <div className={css.commentInfoDiv}>
              <div className={css.whiter}>{commentObj.users_id}</div>
              <div className={css.whiteTime}>{commentObj.created_at}</div>
            </div>
            <div className={css.commentContent}>
              {commentObj.comment_content}
            </div>
          </div>
          <div className={css.rightArea}>
            <div className={css.rightAreaBtnDiv}>
              <button>수정</button>
              <div className={css.divider} />
              <button>삭제</button>
            </div>
            <button className={css.submitBtn} onClick={changeReplyOpenState}>
              답글 쓰기
            </button>
          </div>
        </div>
      </div>
      {replyOpenState && <Reply commentObj={commentObj} />}
    </>
  );
}

export default Comment;
