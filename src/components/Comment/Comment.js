import React from 'react';
import css from './Comment.module.scss';

function Comment() {
  const clickSubmitBtn = event => {};

  return (
    <div className={css.comment}>
      <div className={css.commentMarginDiv}>
        <div className={css.leftArea}>
          <div className={css.commentInfoDiv}>
            <div className={css.whiter}>작성자1</div>
            <div className={css.whiteTime}>2021년 12월 13일 오전 02:56</div>
          </div>
          <div className={css.commentContent}>
            여기 댓글 내용이 들어갑니다. 최대 1000자까지 쓸 수 있어요
          </div>
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
