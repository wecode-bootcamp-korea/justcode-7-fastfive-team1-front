import React, { useState, useEffect } from 'react';
import css from './PostDetail.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Comment from '../../components/Comment/Comment';
import CommentInput from '../../components/Comment/CommentInput';
import Header from '../../components/Header/Header';

function PostDetail() {
  const [copyCheck, setCopyCheck] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [commentCount, setCommentCount] = useState();

  useEffect(() => {
    fetch('/data/commentData.json')
      .then(res => res.json())
      .then(data => {
        const commentCount = Math.ceil(data.commentCount / 20);
        const commentPageArr = [];
        for (let i = 0; i < commentCount; i++) {
          commentPageArr.push(i + 1);
        }
        setCommentCount(commentPageArr);

        // setCommentData(data.commentData);
        //마지막 대댓글 찾는 코드(상의 전까지 보류)
        const processedCommentArr = [];
        for (let i = 0; i < data.commentData.length; i++) {
          const nextElemDepth =
            data.commentData[i + 1] === undefined
              ? false
              : data.commentData[i + 1].depth;
          if (nextElemDepth === 1 || i === data.commentData.length - 1) {
            data.commentData[i].lastComment = true;
          }
          processedCommentArr.push(data.commentData[i]);
        }
        setCommentData(processedCommentArr);
      });
  }, []);

  const clickEmail = event => {
    if (copyCheck) return;
    navigator.clipboard.writeText(event.target.innerText);
    setCopyCheck(true);
    setTimeout(() => {
      setCopyCheck(false);
    }, 2000);
  };

  return (
    <div className={css.postDetail}>
      <Header />
      <div className={css.flexDiv}>
        <Sidebar />
        <div className={`${css.main}`}>
          <div className={`${css.category} ${css.topDonwMargin}`}>
            전체 보기
          </div>
          <div className={`${css.imgAndBtnDiv} ${css.topDonwMargin}`}>
            <div className={`${css.img}`}>img</div>
            <div className={`${css.btnDiv}`}>
              <button>수정</button>
              <div className={`${css.divider}`} />
              <button>삭제</button>
            </div>
          </div>
          <div
            className={`${css.title} ${css.fontEmphasis} ${css.topDonwMargin}`}
          >
            패스트 파이브
          </div>
          <div className={`${css.topDonwMargin}`}>
            패스트파이브는 일하는 공간을 새롭게 정의합니다. 패스트파이브 오피스
            플랫폼은 부동산 시장의 수요와 공급을 혁신적으로 통합하며, 공간을
            채우는 콘텐츠로 기업과 오피스를 연결합니다.
          </div>
          <div className={`${css.workField} ${css.topDonwMargin}`}>
            <div className={`${css.fontEmphasis} ${css.fontEmphasisDiv}`}>
              업무 분야
            </div>
            <div>
              공유 오피스, 라운지 멤버십, 프리미엄 오피스텔, 사옥 컨설팅
            </div>
          </div>
          <div className={`${css.memberBenefit} ${css.topDonwMargin}`}>
            <div className={`${css.fontEmphasis} ${css.fontEmphasisDiv}`}>
              멤버 혜택
            </div>
            <div>패스트파이브 멤버 컨택 시 10% 할인 제공</div>
          </div>
          <div className={`${css.homepage} ${css.topDonwMargin}`}>
            <div className={`${css.fontEmphasis} ${css.fontEmphasisDiv}`}>
              홈페이지
            </div>
            <div>https://www.dkgkrltlfgdj.co.kr</div>
          </div>
          <div className={`${css.address} ${css.topDonwMargin}`}>
            <div className={`${css.fontEmphasis} ${css.fontEmphasisDiv}`}>
              연락처
            </div>
            <div className={`${css.EmailAndPhoneNumber}`}>
              <span className={`${css.Email}`} onClick={clickEmail}>
                sample@fastfive.co.kr
              </span>
              , 010-1234-1234(진양철 회장)
              {copyCheck && (
                <div className={`${css.toastDiv}`}>
                  copy
                  <i className="fa-solid fa-check" />
                </div>
              )}
            </div>
          </div>
          <div className={`${css.topDonwMargin}`}>
            패스트파이브는 일하는 공간을 새롭게 정의합니다. 패스트파이브 오피스
            플랫폼은 부동산 시장의 수요와 공급을 혁신적으로 통합하며, 공간을
            채우는 콘텐츠로 기업과 오피스를 연결합니다. 패스트파이브는 일하는
            공간을 새롭게 정의합니다. 패스트 파이브 오피스 플랫펌은 부동산
            시장의 수요와 공급을 혁신적으로 통합하며, 공간을 채우는 콘텐츠로
            기업과 오피스를 연결합니다. <br />
            패스트 파이브는 일하는 공간을 새롭게 정의합니다.패스트 파이브는
            일하는 공간을 새롭게 정의합니다.패스트 파이브는 일하는 공간을 새롭게
            정의합니다.패스트 파이브는 일하는 공간을 새롭게 정의합니다.
          </div>
          <div className={`${css.introduce} ${css.topDonwMargin}`}>
            <div className={`${css.fontEmphasis} ${css.fontEmphasisDiv}`}>
              회사 소개서
            </div>
            <div>패스트파이브 회사 소개서.pdf</div>
          </div>

          <div className={`${css.commentDiv}`}>
            <div className={`${css.commentDivTitle}`}>댓글</div>
            <CommentInput />
            {commentData.map(commentObj => {
              return <Comment key={commentObj.id} commentObj={commentObj} />;
            })}
          </div>
          <div className={`${css.commentPageDiv}`}>
            {commentCount &&
              commentCount.map(elem => {
                return (
                  <button className={css.commentPageBtn} key={elem}>
                    {elem}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
