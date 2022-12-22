/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SelectForm from '../../components/Form/SelectForm';
import ImageUpload from '../../components/Form/ImageUpload';
import InputForm from '../../components/Form/InputForm';
import SideBar from '../../components/Sidebar/Sidebar';
import Preview from '../../components/Preview/Preview';
import Header from '../../components/Header/Header';
import css from './WritePost.module.scss';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const axios_ = axios.create({
  baseURL: 'http://localhost:5500/',
});

const WritePost = () => {
  const IMAGEMAX = 10 * 1024 * 1024;
  const INTROMAX = 30 * 1024 * 1024;
  const [places, setPlaces] = useState('');
  const [formData, setFormData] = useState('');
  const [logoImageURL, setLogoImageURL] = useState('');
  const [companyProfile, setCompanyProfile] = useState('');
  const [categoryData, setCategoryData] = useState('');
  const [firstCategory, setFirstCategory] = useState([]);
  const [secondCategory, setSecondCategory] = useState([]);
  const [level2CategoriesId, setlevel2CategoriesId] = useState('');
  const [fastfiveBranchesId, setfastfiveBranchesId] = useState('');
  const [logoFile, setLogoFile] = useState('');
  const [infoFile, setInfoFile] = useState('');
  const [checked, setChecked] = useState('');
  const [saveTime, setSaveTime] = useState('');
  const [flag, setFlag] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState({
    companyName: '',
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
  const [require, setRequire] = useState({
    mainCategory: true,
    logoURL: true,
    shortDesc: true,
    field: true,
    branch: true,
    ContactAddress: true,
    isChecked: true,
  });
  const {
    mainCategory,
    logoURL,
    shortDesc,
    field,
    branch,
    ContactAddress,
    isChecked,
  } = require;
  let count = 0;
  const navigate = useNavigate();
  const location = useLocation();
  const stateText = location.state;

  useEffect(() => {
    fetch('http://localhost:5500/branch', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setPlaces(res.data);
      });

    fetch('http://localhost:5500/post-form', {
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

    fetch('http://localhost:5500/category', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setCategoryData(res.data);
      });
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

  useEffect(() => {
    if (formData) {
      const objKeys = Object.keys(text);
      let path = formData.companyInfoUrl;
      let idx = path.lastIndexOf('/');
      objKeys.forEach(key => {
        let value = formData[key];
        value = value === null ? '' : value;
        if (key === 'companyName') {
          value = formData.company.companyName;
        }
        setText(prevState => {
          return { ...prevState, [key]: value };
        });
      });
      setLogoImageURL(formData.companyImgUrl);
      setCompanyProfile(path.substr(idx + 1));
      if (formData.branch) {
        setfastfiveBranchesId(formData.branch.id);
      }
      if (formData.category) {
        setFirstCategory(formData.category.lv1Id);
        setlevel2CategoriesId(formData.category.lv2Id);
      }
    }
  }, [formData]);

  const change = e => {
    const { value, name } = e.target;
    setText({
      ...text,
      [name]: value,
    });
  };

  useEffect(() => {
    if (formData && categoryData) {
      if (firstCategory !== null || firstCategory !== '') {
        setSecondCategory('');
        const subCategories = categoryData[firstCategory - 1].subCategory;
        subCategories.map(subCategory =>
          setSecondCategory(secondCategory => [...secondCategory, subCategory])
        );
      }
    }
  }, [firstCategory]);

  const preview = e => {
    e.preventDefault();
    setIsOpen(true);
  };

  const filePreview = (e, name) => {
    e.preventDefault();
    let file = e.target.files[0];
    if (name === 'file1') {
      file.size > IMAGEMAX
        ? alert('첨부파일 사이즈는 10MB 이내로 등록 가능합니다. ')
        : setLogoImageURL(URL.createObjectURL(file));
      setLogoFile(file);
    } else {
      let path = e.target.value;
      let idx = path.lastIndexOf('\\');
      file.size > INTROMAX
        ? alert('첨부파일 사이즈는 30MB 이내로 등록 가능합니다. ')
        : setCompanyProfile(path.substr(idx + 1));
      setInfoFile(file);
    }
    e.target.value = '';
  };

  const getTime = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let hours = today.getHours();
    let minutes = today.getMinutes();
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
  };

  const fileUpload = async (name, e) => {
    e.preventDefault();
    let outFormData = new FormData();
    const objKeys = Object.keys(text);
    for (let i = 0; i < objKeys.length; i++) {
      outFormData.append(objKeys[i], text[objKeys[i]]);
    }

    outFormData.append('companiesId', formData.company.id);
    outFormData.append('fastfiveBranchesId', fastfiveBranchesId);
    outFormData.append('level2CategoriesId', level2CategoriesId);
    if (logoFile && logoImageURL) {
      outFormData.append('companyImgUrl', logoFile);
    } else if (logoImageURL === '') {
      outFormData.append('companyImgUrl', '');
    }
    if (infoFile && companyProfile) {
      outFormData.append('companyInfoUrl', infoFile);
    } else if (companyProfile === '') {
      outFormData.append('companyInfoUrl', '');
    }

    if (name === '등록') {
      let passUrl = true;

      if (homepageUrl) {
        passUrl = urlValidation();
      }
      if (passUrl) {
        getTime();
        if (submitCheck()) {
          await axios_({
            method: 'PUT',
            url: `/post`,
            mode: 'cors',
            headers: {
              'Content-Type': 'multipart/form-data',
              authorization: localStorage.getItem('token'),
            },
            data: outFormData,
          });
          await axios_({
            method: 'PUT',
            url: `/post-form`,
            mode: 'cors',
            headers: {
              'Content-Type': 'multipart/form-data',
              authorization: localStorage.getItem('token'),
            },
            data: outFormData,
          });
          alert('등록되었습니다!');
          navigate(`/companyList`);
        }
      }
    } else if (name === '임시') {
      getTime();
      await axios_({
        method: 'PUT',
        url: `/post-form`,
        mode: 'cors',
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: localStorage.getItem('token'),
        },
        data: outFormData,
      });
    }
  };
  const submitCheck = () => {
    let rtnflag = false;
    if (checked === false) {
      setChecked('');
    }
    const array = {
      mainCategory: firstCategory,
      logoURL: logoImageURL,
      shortDesc: companyShortDesc,
      field: mainBussinessTags,
      ContactAddress: companyContactAddress,
      branch: places,
      isChecked: checked,
    };
    const flag = [];

    for (let i in require) {
      setRequire(prevState => {
        return {
          ...prevState,
          [i]: String(array[i]).replace(/ /g, '').length > 0 ? true : false,
        };
      });
      flag.push(String(array[i]).replace(/ /g, '').length > 0 ? true : false);
    }
    if (!flag.includes(false)) {
      rtnflag = true;
    } else {
      window.scrollTo(0, 0);
    }
    return rtnflag;
  };

  const changeCheck = e => {
    if (e.target.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
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

  const urlValidation = () => {
    let leg =
      /(http|https):\/\/((\w+)[.])+(cc|com|jp|kr|net|uk|us)(\/(\w*))*$/i;
    let urlTest = leg.test(homepageUrl);
    if (!urlTest) {
      alert('홈페이지 url을 다시 확인해 주세요.');
    }
    return urlTest ? true : false;
  };

  return (
    <>
      <Header />
      <div className={css.container}>
        <div>
          <SideBar />
        </div>

        <div className={css.totalWrap}>
          <h1>우리 회사 소개하기</h1>
          <h3>우측 *표시는 필수 작성 항목입니다.</h3>
          {saveTime && <h3>{saveTime}에 마지막으로 저장 되었습니다.</h3>}

          {formData && places && categoryData && (
            <form>
              <SelectForm
                title="업종 * "
                optionVal="카테고리"
                datum={categoryData}
                setFunc={setFirstCategory}
                selected={firstCategory}
              />
              <SelectForm
                optionVal="상세"
                datum={secondCategory}
                setFunc={setlevel2CategoriesId}
                selected={level2CategoriesId}
              />
              {!mainCategory && <h4>필수 작성 항목입니다.</h4>}
              <br />
              <div className={css.companyName}>
                <InputForm
                  title="회사이름"
                  type="text"
                  onChange={change}
                  name="companyName"
                  value={companyName}
                />
              </div>
              <br />
              <div className={css.companyImage}>
                <ImageUpload
                  title="회사 로고 or 대표 이미지 * "
                  accept="image/png,image/jpg"
                  desc="10mb 이하의 jpg, png 파일을 선택해주세요."
                  onChange={e => filePreview(e, 'file1', this)}
                  fileImage={logoImageURL}
                  alt="companyLogo"
                  type="img"
                  forId="imgUpload"
                  deleteFileImage={deleteFileImage}
                />
                {!logoURL && <h4>필수 작성 항목입니다.</h4>}
              </div>
              <div className={css.introduce}>
                <InputForm
                  title="회사 소개 * "
                  type="textarea"
                  placeholder="100자 이내로 간단하게 설명해 주세요."
                  onChange={change}
                  name="companyShortDesc"
                  value={companyShortDesc || ''}
                  max={100}
                />
                <p
                  className={`${
                    companyShortDesc.length > 99 ? ' ' + css.over : ' '
                  }`}
                >
                  {companyShortDesc.length}/100
                </p>
                {!shortDesc && <h4>필수 작성 항목입니다.</h4>}
              </div>
              <br />
              <div id={css.companyURL}>
                <InputForm
                  title="홈페이지"
                  type="text"
                  placeholder="우리 회사의 홈페이지 주소를 알려주세요."
                  onChange={change}
                  name="homepageUrl"
                  value={homepageUrl || ''}
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
                  value={mainBussinessTags || ''}
                />
                {flag && <h4>주요 업무는 5개 이하로 소개해주세요.</h4>}
                {!field && <h4>필수 작성 항목입니다.</h4>}
              </div>

              <div className={css.detail}>
                <InputForm
                  title="자세한 소개 및 업무 레퍼런스 "
                  type="textarea"
                  placeholder="우리 회사 소개,패스트파이브 멤버들과 협업하고 싶은 프로젝트, 지금까지의 업무 레퍼런스 등 자세한 내용을 공유해주세요."
                  onChange={change}
                  name="companyLongDesc"
                  value={companyLongDesc || ''}
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
                  value={fastfiveBenefitDesc || ''}
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
                  onChange={change}
                  name="companyContactAddress"
                  value={companyContactAddress || ''}
                />
                {!ContactAddress && <h4>필수 작성 항목입니다.</h4>}
              </div>

              <div className={css.companyInfo}>
                <ImageUpload
                  title="회사 소개서"
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
                setFunc={setfastfiveBranchesId}
                selected={fastfiveBranchesId}
              />
              {!branch && <h4>필수 작성 항목입니다.</h4>}
              <br />
              <div className={css.agree}>
                <label>
                  <input type="checkbox" onChange={changeCheck} />
                  패스트파이브 서비스 이용약관에 동의하십니까?(필수)
                </label>
                {!isChecked && <h4>서비스 이용 약관에 동의해 주세요.</h4>}
              </div>

              <div className={css.btns}>
                <button className={css.btn} onClick={preview}>
                  미리보기
                </button>
                {isOpen && (
                  <Preview
                    open={isOpen}
                    onClose={() => {
                      setIsOpen(false);
                    }}
                  />
                )}
                <button
                  className={css.btn}
                  onClick={e => fileUpload('등록', e)}
                >
                  {stateText === '수정' ? '수정하기' : '등록하기'}
                </button>
                <button
                  className={css.btn}
                  onClick={e => fileUpload('임시', e)}
                >
                  임시저장
                </button>
                <button className={css.btn} onClick={e => navigate('/')}>
                  취소
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default WritePost;
