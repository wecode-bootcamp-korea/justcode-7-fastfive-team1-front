import React, { useState, useRef, useEffect } from 'react';
import Reply from './Reply';
import css from './Comment.module.scss';

function Comment({ commentObj }) {
  const [replyOpenState, setReplyOpenState] = useState(commentObj.lastComment);
  const [modifyChecked, setModifyChecked] = useState(false);
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [textareaLength, setTextareaLength] = useState(0);
  const [lockState, setLockState] = useState(false);
  const textarea = useRef();

  const changeReplyOpenState = () => {
    setReplyOpenState(!replyOpenState);
  };

  const clickModifyBtn = () => {
    setModifyChecked(!modifyChecked);
  };

  const changeLockState = event => {
    setLockState(!lockState);
  };

  const changeTextarea = event => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
    setTextareaLength(textarea.current.value.length);
  };

  const clickSubmitBtn = () => {
    console.log(textarea.current.value);
    console.log(lockState);
    console.log(commentObj.comments_id);
  };

  useEffect(() => {
    setLockState(commentObj.is_secret);
  }, []);

  useEffect(() => {
    if (modifyChecked) {
      textarea.current.focus();
      textarea.current.value = commentObj.comment_content;
    }
  }, [modifyChecked]);

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
            {modifyChecked ? (
              <textarea
                className={`${css.commentContent} ${
                  textareaLength > 1000 && css.overText
                }`}
                onChange={changeTextarea}
                rows="1"
                ref={textarea}
                maxLength="1000"
                onFocus={() => {
                  setIsInputClicked(true);
                }}
                onBlur={() => {
                  setIsInputClicked(false);
                }}
                placeholder={
                  isInputClicked
                    ? ''
                    : '위 멤버에게 궁금한 점이나 제안하고 싶은 내용을 댓글로 남겨보세요'
                }
              />
            ) : (
              <div className={css.commentContent}>
                {commentObj.comment_content}
              </div>
            )}
            {modifyChecked && (
              <div className={css.letterCount}>
                <span>{textareaLength}/1000</span>
                {/* {lockState ? (
                  <div className={css.lockDiv}>
                    <i
                      className={`fa-solid fa-lock ${css.lock}`}
                      onClick={changeLockState}
                    />
                  </div>
                ) : (
                  <div className={css.lockDiv}>
                    <i
                      className={`fa-solid fa-lock-open ${css.lockOpen}`}
                      onClick={changeLockState}
                    />
                  </div>
                )} */}
                <div className={css.lockDiv}>
                  <i
                    className={`${
                      lockState ? 'fa-solid fa-lock' : 'fa-solid fa-lock-open'
                    } ${lockState ? css.lock : css.lockOpen}`}
                    onClick={changeLockState}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={css.rightArea}>
            {commentObj.auth === 1 ? (
              <div className={css.rightAreaBtnDiv}>
                <button className={css.modifyBtn} onClick={clickModifyBtn}>
                  수정
                </button>
                <div className={css.divider} />
                <button>삭제</button>
              </div>
            ) : (
              <div className={css.rightAreaBtnDiv} />
            )}

            {modifyChecked && <button onClick={clickSubmitBtn}>등록</button>}
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
