import React from 'react';
import css from './Footer.module.scss';

function Footer() {
  return (
    <div className={css.FooterContainer}>
      <div className={css.FooterContent}>
        <div className={css.FooterHeader}>
          <div className={css.CompanyTitle}>
            <p className={css.CompanyLogo}>FASTFIVE</p>
            <div className={css.Consulting}>
              <p>입주상담</p>
              <p className={css.InfoNumber}>1800-5500</p>
            </div>
          </div>
          <div className={css.TimeTable}>
            <table>
              <tr>
                <td className={css.TimeTableInfo}>월-목요일: 9:30 - 18:00</td>
                <td className={css.TimeTableInfo}>금요일: 9:30 - 17:00</td>
                <td className={css.TimeTableInfo}>점심시간: 12:00 - 13:00</td>
              </tr>
              <tr>
                <td className={css.TimeTableInfo}>contact@fastfive.co.kr</td>
                <td className={css.TimeTableInfo}>카카오톡: @FASTFIVE</td>
              </tr>
            </table>
          </div>
        </div>
        <div className={css.FooterCompanyIntroduce}>
          <span className={css.IntroduceContent}>패스트파이브 소개서</span>
          <span className={css.IntroduceContent}>회사 소개</span>
          <span className={css.IntroduceContent}>파이브스팟</span>
          <span className={css.IntroduceContent}>모버스</span>
          <span className={css.IntroduceContent}>빌딩 솔루션</span>
          <span className={css.IntroduceContent}>거점 오피스</span>
          <span className={css.IntroduceContent}>파이브클라우드</span>
          <span className={css.IntroduceContent}>파이브애드</span>
          <span className={css.IntroduceContent}>채용</span>
        </div>
        <div className={css.FooterInquiry}>
          <p className={css.InquiryContent}>
            PR : <span className={css.EmailInfo}>pr@fastfive.co.kr</span>
          </p>
          <p className={css.InquiryContent}>
            부동산 :{' '}
            <span className={css.EmailInfo}>realestate@fastfive.co.kr</span>
          </p>
          <p className={css.InquiryContent}>
            <span className={css.InfoAd}>제휴 문의</span>
          </p>
          <p className={css.InfoAd}>광고/이벤트 문의</p>
        </div>
        <div className={css.FooterCompanyInfo}>
          <span className={css.FooterCompanyContent}>패스트파이브(주)</span>
          <span className={css.FooterCompanyContent}>대표: 김땡땡</span>
          <span className={css.FooterCompanyContent}>
            사업자등록번호: 151-00-00000
          </span>
          <span className={css.PrivacyPolicy}>개인정보 취급 방침</span>
        </div>
        <div className={css.FooterIcons}>
          <img
            className={css.IconImg}
            src="https://cdn-icons-png.flaticon.com/512/2168/2168281.png"
          />
          <img
            className={css.IconImg}
            src="https://cdn-icons-png.flaticon.com/512/2175/2175198.png"
          />
          <img
            className={css.IconImg}
            src="https://cdn-icons-png.flaticon.com/512/3669/3669688.png"
          />
          <img
            className={css.IconImg}
            src="https://cdn-icons-png.flaticon.com/512/3665/3665954.png"
          />
          <img
            className={css.IconImg}
            src="https://cdn-icons-png.flaticon.com/512/5119/5119016.png"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
