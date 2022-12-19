import React, { useState, useEffect } from 'react';
import css from './Footer.module.scss';

const Footer = () => {
  const [footercontent, setFooterContent] = useState([]);

  useEffect(() => {
    fetch('/data/FooterData.json')
      .then(res => res.json())
      .then(res => setFooterContent(res.footer));
  }, []);
  return (
    <div className={css.footerContainer}>
      <div className={css.footerContent}>
        <div className={css.footerHeader}>
          <div className={css.companyTitle}>
            <p className={css.companyLogo}>FASTFIVE</p>
            <div className={css.consulting}>
              <p>입주상담</p>
              <p className={css.infoNumber}>1800-5500</p>
            </div>
          </div>
          <div className={css.timeTable}>
            <table>
              <tbody>
                <tr>
                  <td className={css.timeTableInfo}>월-목요일: 9:30 - 18:00</td>
                  <td className={css.timeTableInfo}>금요일: 9:30 - 17:00</td>
                  <td className={css.timeTableInfo}>점심시간: 12:00 - 13:00</td>
                </tr>
                <tr>
                  <td className={css.timeTableInfo}>contact@fastfive.co.kr</td>
                  <td className={css.timeTableInfo}>카카오톡: @FASTFIVE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={css.footerCompanyIntroduce}>
          {footercontent.map(data => {
            return (
              <span key={data.id} className={css.introduceContent}>
                {data.content}
              </span>
            );
          })}
        </div>
        <div className={css.footerInquiry}>
          <p className={css.inquiryContent}>
            PR : <span className={css.emailInfo}>pr@fastfive.co.kr</span>
          </p>
          <p className={css.inquiryContent}>
            부동산 :{' '}
            <span className={css.emailInfo}>realestate@fastfive.co.kr</span>
          </p>
          <p className={css.inquiryContent}>
            <span className={css.infoAd}>제휴 문의</span>
          </p>
          <p className={css.infoAd}>광고/이벤트 문의</p>
        </div>
        <div className={css.footerCompanyInfo}>
          <span className={css.footerCompanyContent}>패스트파이브(주)</span>
          <span className={css.footerCompanyContent}>대표: 김땡땡</span>
          <span className={css.footerCompanyContent}>
            사업자등록번호: 151-00-00000
          </span>
          <span className={css.privacyPolicy}>개인정보 취급 방침</span>
        </div>
        <div className={css.footerIcons}>
          <img
            className={css.iconImg}
            src="https://cdn-icons-png.flaticon.com/512/2168/2168281.png"
            alt="facebookLogo"
          />
          <img
            className={css.iconImg}
            src="https://cdn-icons-png.flaticon.com/512/2175/2175198.png"
            alt="instagramLogo"
          />
          <img
            className={css.iconImg}
            src="https://cdn-icons-png.flaticon.com/512/3669/3669688.png"
            alt="youtubelogo"
          />
          <img
            className={css.iconImg}
            src="https://cdn-icons-png.flaticon.com/512/3665/3665954.png"
            alt="naverLogo"
          />
          <img
            className={css.iconImg}
            src="https://cdn-icons-png.flaticon.com/512/5119/5119016.png"
            alt="bLogo"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
