/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SelectForm from '../../components/Form/SelectForm';
import ImageUpload from '../../components/Form/ImageUpload';
import InputForm from '../../components/Form/InputForm';
import SideBar from '../../components/Sidebar/Sidebar';
import Preview from '../../components/Preview/Preview';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import css from './WritePost.module.scss';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const axios_ = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}/`,
});

const WritePost = () => {
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    const elementScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPos = (elementScroll / windowHeight) * 100;
    document.getElementById('progBar').style.width = scrollPos + '%';
  }
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
    fetch(`${process.env.REACT_APP_API_URI}/branch`, {
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

    fetch(`${process.env.REACT_APP_API_URI}/category`, {
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
    let firstCat;
    if (formData && categoryData) {
      if (firstCategory !== null || firstCategory !== '') {
        categoryData.forEach(data => {
          if (data.id === firstCategory) {
            firstCat = data;
          }
        });
        setSecondCategory('');
        const subCategories = firstCat.subCategory;
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
        ? alert('???????????? ???????????? 10MB ????????? ?????? ???????????????. ')
        : setLogoImageURL(URL.createObjectURL(file));
      setLogoFile(file);
    } else {
      let path = e.target.value;
      let idx = path.lastIndexOf('\\');
      file.size > INTROMAX
        ? alert('???????????? ???????????? 30MB ????????? ?????? ???????????????. ')
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
        '??? ' +
        ' ' +
        minutes +
        '???'
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

    if (name === '??????') {
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
          alert('?????????????????????!');
          navigate(`/companyList`);
        }
      }
    } else if (name === '??????') {
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
      alert('???????????? url??? ?????? ????????? ?????????.');
    }
    return urlTest ? true : false;
  };

  return (
    <>
      <div className={css.header}>
        <Header />
      </div>
      <div className={css.wrapper}>
        <div className={css.progress} id="progBar"></div>
      </div>
      <div className={css.container}>
        <div className={css.SideBarWrap}>
          <SideBar />
        </div>

        <div className={css.totalWrap}>
          <h1>?????? ?????? ????????????</h1>
          <h3>?????? *????????? ?????? ?????? ???????????????.</h3>
          {saveTime && <h3>{saveTime}??? ??????????????? ?????? ???????????????.</h3>}

          {formData && places && categoryData && (
            <form>
              <SelectForm
                title="?????? * "
                optionVal="????????????"
                datum={categoryData}
                setFunc={setFirstCategory}
                selected={firstCategory}
              />
              <SelectForm
                optionVal="??????"
                datum={secondCategory}
                setFunc={setlevel2CategoriesId}
                selected={level2CategoriesId}
              />
              {!mainCategory && <h4>?????? ?????? ???????????????.</h4>}
              <br />
              <div className={css.companyName}>
                <InputForm
                  title="????????????"
                  type="text"
                  onChange={change}
                  name="companyName"
                  value={companyName}
                />
              </div>
              <br />
              <div className={css.companyImage}>
                <ImageUpload
                  title="?????? ?????? or ?????? ????????? * "
                  accept="image/png,image/jpg"
                  desc="10mb ????????? jpg, png ????????? ??????????????????."
                  onChange={e => filePreview(e, 'file1', this)}
                  fileImage={logoImageURL}
                  alt="companyLogo"
                  type="img"
                  forId="imgUpload"
                  deleteFileImage={deleteFileImage}
                />
                {!logoURL && <h4>?????? ?????? ???????????????.</h4>}
              </div>
              <div className={css.introduce}>
                <InputForm
                  title="?????? ?????? * "
                  type="textarea"
                  placeholder="100??? ????????? ???????????? ????????? ?????????."
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
                {!shortDesc && <h4>?????? ?????? ???????????????.</h4>}
              </div>
              <br />
              <div id={css.companyURL}>
                <InputForm
                  title="????????????"
                  type="text"
                  placeholder="?????? ????????? ???????????? ????????? ???????????????."
                  onChange={change}
                  name="homepageUrl"
                  value={homepageUrl || ''}
                />
              </div>
              <br />
              <div id={css.field}>
                <InputForm
                  title="?????? ?????? ?????? * "
                  type="text"
                  placeholder="5??? ????????? ?????? ????????? ????????? ???????????? ??????????????????. ex) ????????? ?????????, ????????? ??????, ???????????? "
                  onChange={change}
                  name="mainBussinessTags"
                  value={mainBussinessTags || ''}
                />
                {flag && <h4>?????? ????????? 5??? ????????? ??????????????????.</h4>}
                {!field && <h4>?????? ?????? ???????????????.</h4>}
              </div>

              <div className={css.detail}>
                <InputForm
                  title="????????? ?????? ??? ?????? ???????????? "
                  type="textarea"
                  placeholder="?????? ?????? ??????,?????????????????? ???????????? ???????????? ?????? ????????????, ??????????????? ?????? ???????????? ??? ????????? ????????? ??????????????????."
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
                  title="?????????????????? ?????? ?????? "
                  type="textarea"
                  placeholder="?????????????????? ??????????????? ???????????? ????????? ????????? ???????????????.&#13;&#10; ex)?????????????????? ?????? ?????? ??? ????????? 10% ????????????"
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
                  title="??????????????? * "
                  type="text"
                  placeholder="????????? ????????? ????????? ???????????? ???????????????. ex) sample@fastfive.co.kr, 010-1234-1234 "
                  onChange={change}
                  name="companyContactAddress"
                  value={companyContactAddress || ''}
                />
                {!ContactAddress && <h4>?????? ?????? ???????????????.</h4>}
              </div>

              <div className={css.companyInfo}>
                <ImageUpload
                  title="?????? ?????????"
                  accept="application/pdf,image/png,image/jpg"
                  desc="30mb ????????? pdf, jpg, png ????????? ??????????????????."
                  onChange={e => filePreview(e, 'file2', this)}
                  type="document"
                  forId="documentUpload"
                  fileName={companyProfile}
                  deleteFileImage={deleteFileImage}
                />
              </div>
              <br />

              <SelectForm
                title="?????? ?????? ?????? * "
                optionVal="?????????"
                datum={places}
                setFunc={setfastfiveBranchesId}
                selected={fastfiveBranchesId}
              />
              {!branch && <h4>?????? ?????? ???????????????.</h4>}
              <br />
              <div className={css.agree}>
                <label>
                  <input type="checkbox" onChange={changeCheck} />
                  ?????????????????? ????????? ??????????????? ???????????????????(??????)
                </label>
                {!isChecked && <h4>????????? ?????? ????????? ????????? ?????????.</h4>}
              </div>

              <div className={css.btns}>
                <button className={css.btn} onClick={preview}>
                  ????????????
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
                  onClick={e => fileUpload('??????', e)}
                >
                  {stateText === '??????' ? '????????????' : '????????????'}
                </button>
                <button
                  className={css.btn}
                  onClick={e => fileUpload('??????', e)}
                >
                  ????????????
                </button>
                <button className={css.btn} onClick={e => navigate('/')}>
                  ??????
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WritePost;
