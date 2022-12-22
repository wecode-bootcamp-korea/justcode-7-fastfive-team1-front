import React, { useEffect, useState } from 'react';
import css from './Preview.module.scss';

function Preview({ onClose }) {
  const [formData, setFormData] = useState('');
  const [infoPath, setInfoPath] = useState('');
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URI}/post-form`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setFormData(res);
      });
  }, []);

  useEffect(() => {
    if (formData) {
      let path = formData.companyInfoUrl;
      let idx = path.lastIndexOf('/');
      setInfoPath(path.substr(idx + 1));
    }
  }, [formData]);

  const handleClose = () => {
    onClose?.();
  };

  return (
    <div className={css.container}>
      <div className={css.contents}>
        <div className={`${css.imgAndBtnDiv} ${css.topDonwMargin}`}>
          <div className={css.logo}>
            {formData.companyImgUrl && (
              <img src={formData.companyImgUrl} alt="로고사진" />
            )}
          </div>
        </div>

        <div className={css.title}>
          <b>{formData.companyName}</b>
        </div>
        <div className={css.description}>{formData.companyShortDesc}</div>
        <div className={`${css.workField} ${css.topDonwMargin}`}>
          <b className={css.menu}>업무 분야 </b> {formData.mainBussinessTags}
        </div>
        <div className={`${css.memberBenefit} ${css.topDonwMargin}`}>
          <div className={`${css.fontEmphasis} ${css.fontEmphasisDiv}`}>
            <b className={css.menu}>멤버 혜택</b> {formData.fastfiveBenefitDesc}
          </div>
        </div>
        <div className={`${css.homepage} ${css.topDonwMargin}`}>
          <div className={`${css.fontEmphasis} ${css.fontEmphasisDiv}`}>
            <b className={css.menu}>홈페이지</b> {formData.homepageUrl}
          </div>
        </div>
        <div className={`${css.address} ${css.topDonwMargin}`}>
          <div className={`${css.fontEmphasis} ${css.fontEmphasisDiv}`}>
            <b className={css.menu}>연락처</b> {formData.companyContactAddress}
          </div>
        </div>
        <div className={css.description}>{formData.companyLongDesc}</div>
        <div className={`${css.introduce} ${css.topDonwMargin}`}>
          <div className={`${css.fontEmphasis} ${css.fontEmphasisDiv}`}>
            <b className={css.menu}>회사 소개서</b>
            {infoPath}
          </div>
        </div>
        <button className={css.btn} onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Preview;
