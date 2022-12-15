/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import css from './WritePost.module.scss';
import SelectForm from '../../components/Form/SelectForm';
import ImageUpload from '../../components/Form/ImageUpload';
import InputForm from '../../components/Form/InputForm';
import axios from 'axios';

function WritePost() {
  const IMAGEMAX = 10 * 1024 * 1024;
  const INTROMAX = 30 * 1024 * 1024;
  const [places, setPlaces] = useState('');
  const [logoImageURL, setLogoImageURL] = useState('');
  const [companyProfile, setCompanyProfile] = useState('');
  const [logoFile, setLogoFile] = useState('');
  const [infoFile, setInfoFile] = useState('');
  const [saveTime, setSaveTime] = useState('');
  const [text, setText] = useState({
    companyName: '주식회사',
    companyShortDesc: '',
    homepageUrl: '',
    mainBussinessTags: '',
    companyLongDesc: '',
    fastfiveBenefitDesc: '',
    companyContactAddress: '',
  });
  const {
    companyName,
    companyShortDesc,
    homepageUrl,
    mainBussinessTags,
    companyLongDesc,
    fastfiveBenefitDesc,
    companyContactAddress,
  } = text;
  const [flag, setFlag] = useState(false);
  let count = 0;

  const change = e => {
    const { value, name } = e.target;
    setText({
      ...text,
      [name]: value,
    });
  };

  const filePreview = (e, name) => {
    e.preventDefault();
    if (name === 'file1') {
      e.target.files[0].size > IMAGEMAX
        ? alert('첨부파일 사이즈는 10MB 이내로 등록 가능합니다. ')
        : setLogoImageURL(URL.createObjectURL(e.target.files[0]));
      setLogoFile(e.target.files[0]);
    } else {
      let path = e.target.value;
      let idx = path.lastIndexOf('\\');
      e.target.files[0].size > INTROMAX
        ? alert('첨부파일 사이즈는 30MB 이내로 등록 가능합니다. ')
        : setCompanyProfile(path.substr(idx + 1));
      setInfoFile(e.target.files[0]);
    }
    e.target.value = '';
  };

  //companyID 받아오기
  //파일 다를시  조건부 랜더링
  //flag 하나 더 달아서 경고문구 나타내기
  // formData.append("companiesId", companyId.current.value);
  // formData.append("level2CategoriesId", level2CategoriesId.current.value);

  const fileUpload = async () => {
    //만약 등록하기 or 수정하기 버튼눌러졌으면 필수 항목 다 채워졌는지 확인하는 로직 추가
    let formData = new FormData();
    const objKeys = Object.keys(text);

    for (let i = 0; i < objKeys.length; i++) {
      formData.append(objKeys[i], text[objKeys[i]]);
    }
    formData.append('companyImgUrl', logoFile);
    formData.append('companyInfoUrl', infoFile);

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    const postForm = await axios({
      method: 'PUT',
      url: `{back-end url}`,
      mode: 'cors',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
    // console.log(postForm);
  };

  const deleteFileImage = e => {
    if (e.target.id === 'file1') {
      URL.revokeObjectURL(logoImageURL);
      setLogoImageURL('');
      setLogoFile('');
    } else {
      setCompanyProfile('');
      setInfoFile('');
    }
  };
  // console.log(text);
  // console.log(Object.keys(text)); //key로 백엔드에 보낼때도
  //파일폼으로 한데 모으고 백으로 보내는 함수 만글기 submit일대 유효성 검사 하기
  setInterval(function () {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    fileUpload();
    setSaveTime(
      year +
        '. ' +
        month +
        '. ' +
        date +
        '. ' +
        hours +
        '시 ' +
        ' ' +
        minutes +
        '분'
    );
  }, 60000);

  useEffect(() => {
    fetch('/data/place.json')
      .then(res => res.json())
      .then(res => setPlaces(res.place));
  }, []);

  useEffect(() => {
    const comma = ',';
    let idx = mainBussinessTags.indexOf(comma);
    while (idx !== -1) {
      count += 1;
      idx = mainBussinessTags.indexOf(comma, idx + 1);
    }
    count > 4 ? setFlag(true) : setFlag(false);
  }, [mainBussinessTags]);

  //TODO: urlValidation 다시 생각해보기
  const urlValidation = () => {
    let leg =
      /(http|https):\/\/((\w+)[.])+(cc|com|jp|kr|net|uk|us)(\/(\w*))*$/i;
    let urlTest = leg.test(homepageUrl);
    urlTest ? alert('pass') : alert('reject');
  };

  return (
    <div className={css.container}>
      {/**TODO: SideBar gonna be here */}
      <div className={css.sideBar}>메뉴바</div>

      <div className={css.totalWrap}>
        <h1>우리 회사 소개하기</h1>
        <h3>우측 *표시는 필수 작성 항목입니다.</h3>
        {saveTime && <h3>{saveTime}에 자동 저장되었습니다.</h3>}

        {places && (
          <form>
            <SelectForm title="업종 * " optionVal="카테고리" datum={places} />
            <SelectForm optionVal="상세" datum={places} />
            <br />
            <InputForm
              title="회사이름"
              type="text"
              onChange={change}
              name="companyName"
              value={companyName}
              flag={true}
            />
            <br />
            <div className={css.companyImage}>
              <ImageUpload
                title="회사 로고 or 대표 이미지 * "
                required={true}
                accept="image/png,image/jpg"
                desc="10mb 이하의 jpg, png 파일을 선택해주세요."
                onChange={e => filePreview(e, 'file1', this)}
                fileImage={logoImageURL}
                alt="companyLogo"
                type="img"
                forId="imgUpload"
                deleteFileImage={deleteFileImage}
              />
            </div>
            {/*파일 첨부시,  */}
            <div className={css.introduce}>
              <InputForm
                title="회사 소개 * "
                type="textarea"
                placeholder="100자 이내로 간단하게 설명해 주세요."
                onChange={change}
                name="companyShortDesc"
                value={companyShortDesc}
                max={100}
              />
              <p
                className={`${
                  companyShortDesc.length > 99 ? ' ' + css.over : ' '
                }`}
              >
                {companyShortDesc.length}/100
              </p>
            </div>
            <br />
            <div id={css.companyURL}>
              <InputForm
                title="홈페이지"
                type="text"
                placeholder="우리 회사의 홈페이지 주소를 알려주세요."
                onChange={change}
                name="homepageUrl"
                value={homepageUrl}
              />
            </div>
            <br />
            <div id={css.field}>
              <InputForm
                title="주력 업무 분야 * "
                type="text"
                placeholder="5개 이하의 주요 업무를 쉼표로 구분하여 입력해주세요. ex) 디지털 마케팅, 콘텐츠 제장, 영상제작 "
                onChange={change}
                name="mainBussinessTags"
                value={mainBussinessTags}
                flag={true}
              />
              {flag && <h4>주요 업무는 5개 이하로 소개해주세요.</h4>}
            </div>

            <div className={css.detail}>
              <InputForm
                title="자세한 소개 및 업무 레퍼런스 "
                type="textarea"
                placeholder="우리 회사 소개,패스트파이브 멤버들과 협업하고 싶은 프로젝트, 지금까지의 업무 레퍼런스 등 자세한 내용을 공유해주세요."
                onChange={change}
                name="companyLongDesc"
                value={companyLongDesc}
                max={1000}
              />
              <p
                className={`${
                  companyLongDesc.length > 999 ? ' ' + css.over : ' '
                }`}
              >
                {companyLongDesc.length}/1000
              </p>
            </div>

            <div className={css.detail}>
              <InputForm
                title="패스트파이브 멤버 혜택 "
                type="textarea"
                placeholder="패스트파이브 멤버에게만 제공되는 혜택이 있다면 알려주세요.&#13;&#10; ex)패스트파이브 멤버 컨택 시 견적의 10% 할인제공"
                onChange={change}
                name="fastfiveBenefitDesc"
                value={fastfiveBenefitDesc}
                max={100}
              />
              <p
                className={`${
                  fastfiveBenefitDesc.length > 99 ? ' ' + css.over : ' '
                }`}
              >
                {fastfiveBenefitDesc.length}/100
              </p>
            </div>

            <div id={css.field}>
              <InputForm
                title="대표연락처 * "
                type="text"
                placeholder="업무상 컨택이 가능한 연락처를 알려주세요. ex) sample@fastfive.co.kr, 010-1234-1234 "
                flag={true}
                onChange={change}
                name="companyContactAddress"
                value={companyContactAddress}
              />
            </div>

            <div className={css.companyInfo}>
              <ImageUpload
                title="회사 소개서"
                required={false}
                accept="application/pdf,image/png,image/jpg"
                desc="30mb 이하의 pdf, jpg, png 파일을 선택해주세요."
                onChange={e => filePreview(e, 'file2', this)}
                type="document"
                forId="documentUpload"
                fileName={companyProfile}
                deleteFileImage={deleteFileImage}
              />
            </div>
            <br />

            <SelectForm
              title="이용 중인 지점 * "
              optionVal="지점명"
              datum={places}
            />
            <br />

            <label className={css.agree}>
              <input type="checkbox" required />
              패스트파이브 서비스 이용약관에 동의하십니까?(필수)
            </label>

            <div className={css.btns}>
              <button>미리보기</button>
              {/*등록된 파일이 있을시 수정하기로 들어와짐 */}
              <button>등록하기</button>
              <button>취소</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default WritePost;
