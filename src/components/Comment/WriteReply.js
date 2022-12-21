import React, { useState, useRef, useEffect } from 'react';
import css from './WriteReply.module.scss';

function Comment({
  commentObj,
  setCommentPageTotalCount,
  currCommentPage,
  setCommentData,
  setReplyOpenState,
  totalCommentCount,
}) {
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [textareaLength, setTextareaLength] = useState(0);
  const [lockState, setLockState] = useState(false);
  const textarea = useRef();

  const [placeHolderValue, setPlaceHolderValue] = useState();
  useEffect(() => {
    dicidePlaceHolderValue();
  }, [totalCommentCount, isInputClicked]);

  const dicidePlaceHolderValue = () => {
    if (totalCommentCount >= 1000) {
      setPlaceHolderValue(
        '한 게시글에 등록할 수 있는 댓글 개수가 초과되었습니다. 대표 연락처를 참고해주세요.'
      );
      return;
    }

    setPlaceHolderValue(
      isInputClicked
        ? ''
        : '위 멤버에게 궁금한 점이나 제안하고 싶은 내용을 댓글로 남겨보세요'
    );
  };

  const changeTextarea = event => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
    setTextareaLength(textarea.current.value.length);
  };

  const changeLockState = event => {
    setLockState(!lockState);
  };

  const clickSubmitBtn = () => {
    const textLength = textarea.current.value.length;
    if (textLength < 1 || textLength > 1000) return;

    fetch('http://127.0.0.1:5500/commentOnComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        comment: textarea.current.value,
        postId: 1,
        is_secret: lockState ? 1 : 0,
        commentId: commentObj.id,
      }),
    }).then(() => {
      fetch(`http://127.0.0.1:5500/comment/1?page=${currCommentPage}`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
        .then(res => res.json())
        .then(data => {
          setCommentData(data.data);
          setCommentPageTotalCount(Math.ceil(data.length / 20));
        });
    });

    setReplyOpenState(false);
  };

  return (
    <div className={css.comment}>
      <div className={css.commentMarginDiv}>
        <div className={css.leftArea}>
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
            placeholder={placeHolderValue}
          />
          <div className={css.letterCount}>
            <span>{textareaLength}/1000</span>
            <div className={css.lockDiv}>
              <i
                className={`${
                  lockState ? 'fa-solid fa-lock' : 'fa-solid fa-lock-open'
                } ${lockState ? css.lock : css.lockOpen}`}
                onClick={changeLockState}
              />
            </div>
          </div>
        </div>
        <div className={css.rightArea}>
          <button onClick={clickSubmitBtn}>등록</button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
