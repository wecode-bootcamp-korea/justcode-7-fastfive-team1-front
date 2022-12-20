import React from 'react';
import css from './Reply.module.scss';

function Comment({ commentObj }) {
  const clickSubmitBtn = event => {};

  return (
    <div className={css.comment}>
      <div className={css.commentMarginDiv}>
        <div className={css.leftArea}>
          <div className={css.commentInfoDiv}>
            <div className={css.whiter}>{commentObj.users_id}</div>
            <div className={css.whiteTime}>{commentObj.created_at}</div>
          </div>
          <div className={css.commentContent}>{commentObj.comment_content}</div>
        </div>
        <div className={css.rightArea}>
          <div className={css.rightAreaBtnDiv}>
            <button>수정</button>
            <div className={css.divider} />
            <button>삭제</button>
          </div>
          <button className={css.submitBtn} onClick={clickSubmitBtn}>
            답글 쓰기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
