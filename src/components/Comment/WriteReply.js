import React from 'react';
import css from './WriteReply.module.scss';

function Comment() {
  return (
    <div className={css.reply}>
      <div className={css.commentMarginDiv}>
        <div className={css.leftArea}>
          <div className={css.replyContent}>
            위 멤버에게 궁금한 점이나 제안하고 싶은 내용을 댓글로 남겨보세요
          </div>
          <div className={css.letterCount}>
            <span>140/1000</span>
            <i className="fa-solid fa-lock" />
          </div>
        </div>
        <div className={css.rightArea}>
          <button>등록</button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
