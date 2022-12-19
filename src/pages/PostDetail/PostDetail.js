import React from 'react';
import css from './PostDetail.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Comment from '../../components/Comment/Comment';
import WriteReply from '../../components/Comment/WriteReply';

const PostDetail = () => {
  return (
    <div className={css.postDetail}>
      <Sidebar />
      <div className={`${css.main}`}>
        <div className={`${css.category} ${css.topDonwMargin}`}>전체 보기</div>

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
          <div>공유 오피스, 라운지 멤버십, 프리미엄 오피스텔, 사옥 컨설팅</div>
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
          <div>sample@fastfive.co.kr, 010-1234-1234(진양철 회장)</div>
        </div>
        <div className={`${css.topDonwMargin}`}>
          패스트파이브는 일하는 공간을 새롭게 정의합니다. 패스트파이브 오피스
          플랫폼은 부동산 시장의 수요와 공급을 혁신적으로 통합하며, 공간을
          채우는 콘텐츠로 기업과 오피스를 연결합니다. 패스트파이브는 일하는
          공간을 새롭게 정의합니다. 패스트 파이브 오피스 플랫펌은 부동산 시장의
          수요와 공급을 혁신적으로 통합하며, 공간을 채우는 콘텐츠로 기업과
          오피스를 연결합니다. <br />
          패스트 파이브는 일하는 공간을 새롭게 정의합니다.패스트 파이브는 일하는
          공간을 새롭게 정의합니다.패스트 파이브는 일하는 공간을 새롭게
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
          <Comment />
          <WriteReply />
          <Comment />
          <WriteReply />
          <Comment />
          <WriteReply />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
