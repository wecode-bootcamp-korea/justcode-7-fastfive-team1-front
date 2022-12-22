import React, { useState, useRef, useEffect } from 'react';
import Reply from './WriteReply';
import css from './Comment.module.scss';

function Comment({
  commentObj,
  currCommentPage,
  setCommentData,
  setCommentPageTotalCount,
  totalCommentCount,
  postData,
  commentPageTotalCount,
}) {
  const [replyOpenState, setReplyOpenState] = useState(false);
  const [modifyChecked, setModifyChecked] = useState(false);
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [textareaLength, setTextareaLength] = useState(0);
  const [lockState, setLockState] = useState(false);
  const textarea = useRef();
  const submitBtn = useRef();

  const date = new Date(commentObj.created_at);
  const currDate = date.getDate();
  const currYear = date.getFullYear();
  const currMonth = date.getMonth();
  const currHours = date.getHours();
  const currMinutes = date.getMinutes();
  const currSeconds = date.getSeconds();

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

  const changeReplyOpenState = () => {
    setReplyOpenState(!replyOpenState);
  };

  const clickModifyBtn = event => {
    setModifyChecked(!modifyChecked);
  };

  const changeLockState = event => {
    setLockState(!lockState);
  };

  const changeTextarea = event => {
    const textLength = textarea.current.value.length;
    if (textLength !== undefined) {
      submitBtn.current.style.color = textLength === 0 ? 'gray' : 'black';
      submitBtn.current.style.fontWeight = textLength === 0 ? '400' : '600';
    }

    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
    setTextareaLength(textarea.current.value.length);
  };

  const clickSubmitBtn = () => {
    fetch('http://127.0.0.1:5500/comment', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        comment: textarea.current.value,
        is_secret: lockState ? 1 : 0,
        commentId: commentObj.id,
      }),
    }).then(() => {
      fetch(
        `http://127.0.0.1:5500/comment/${postData.id}?page=${currCommentPage}`,
        {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        }
      )
        .then(res => res.json())
        .then(data => {
          setCommentData(data.data);
        });
    });

    setModifyChecked(!modifyChecked);
  };

  const clickDeleteBtn = () => {
    fetch('http://127.0.0.1:5500/comment', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        commentId: commentObj.id,
      }),
    }).then(() => {
      fetch(
        `http://127.0.0.1:5500/comment/${postData.id}?page=${currCommentPage}`,
        {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        }
      )
        .then(res => res.json())
        .then(data => setCommentData(data.data));
    });
  };

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
              <div className={css.whiter}>{commentObj.username}</div>
              <div className={css.whiteTime}>
                {`${currYear}.${currMonth}.${currDate} ${currHours}.${currMinutes}.${currSeconds}`}
              </div>
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
                placeholder={placeHolderValue}
              />
            ) : (
              <div className={css.commentContent}>
                {commentObj.comment_content}
              </div>
            )}
            {modifyChecked && (
              <div className={css.letterCount}>
                <span className={css.countLetter}>{textareaLength}/1000</span>
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
                <button className={css.deleteBtn} onClick={clickDeleteBtn}>
                  삭제
                </button>
              </div>
            ) : (
              <div className={css.rightAreaBtnDiv} />
            )}

            {modifyChecked && (
              <button
                className={css.submitBtn}
                onClick={clickSubmitBtn}
                ref={submitBtn}
              >
                등록
              </button>
            )}
            {!modifyChecked && (
              <button className={css.submitBtn} onClick={changeReplyOpenState}>
                답글 쓰기
              </button>
            )}
          </div>
        </div>
      </div>
      {replyOpenState && (
        <Reply
          commentObj={commentObj}
          commentPageTotalCount={commentPageTotalCount}
          setCommentPageTotalCount={setCommentPageTotalCount}
          currCommentPage={currCommentPage}
          setCommentData={setCommentData}
          setReplyOpenState={setReplyOpenState}
          totalCommentCount={totalCommentCount}
          postData={postData}
        />
      )}
    </>
  );
}

export default Comment;
