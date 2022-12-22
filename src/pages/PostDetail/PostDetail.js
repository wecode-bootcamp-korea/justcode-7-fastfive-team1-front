import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';

import css from './PostDetail.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Comment from '../../components/Comment/Comment';
import CommentInput from '../../components/Comment/WriteComment';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function PostDetail() {
  const [userInfo, setUserInfo] = useState();
  const [userGrade, setUserGrade] = useState();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const ourGruop = query.get('ourGruop');
  const [postData, setPostData] = useState({});
  const { page } = useParams();

  const [copyCheck, setCopyCheck] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [totalCommentCount, setTotalCommentCount] = useState(0);
  const [currCommentPage, setCurrCommentPage] = useState(1); // 현재 페이지 위치
  const [currCommentPageList, setCurrCommentPageList] = useState([]); // 화면에 노출될 페이지 arr
  const [commentPageTotalCount, setCommentPageTotalCount] = useState(); // 총 페이지 수
  const commentDiv = useRef();
  const navigate = useNavigate();
  const categoryValue = location.state;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URI}/user`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setUserInfo(data.userInfo);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URI}/grade`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => setUserGrade(data.userGradeInfo));
  }, []);

  useEffect(() => {
    if (ourGruop) {
      fetch(`${process.env.REACT_APP_API_URI}/post?ourGruop=${ourGruop}`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
        .then(res => res.json())
        .then(data => {
          setPostData(data);
        });
    }

    if (page) {
      fetch(`${process.env.REACT_APP_API_URI}/post/${page}`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
        .then(res => res.json())
        .then(data => setPostData(data));
    }
  }, []);

  useEffect(() => {
    // fetch('/data/commentData.json')

    if (Object.keys(postData).length !== 0) {
      console.log(postData);
      fetch(`http://127.0.0.1:5500/comment/${postData.id}?page=1`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
        .then(res => res.json())
        .then(data => {
          setTotalCommentCount(data.length);
          setCommentPageTotalCount(Math.ceil(data.length / 20));

          //마지막 대댓글 찾는 코드
          const processedCommentArr = [];
          for (let i = 0; i < data.data.length; i++) {
            const nextElemDepth =
              data.data[i + 1] === undefined ? false : data.data[i + 1].depth;
            if (nextElemDepth === 1 || i === data.data.length - 1) {
              data.data[i].lastComment = true;
            }
            processedCommentArr.push(data.data[i]);
          }
          setCommentData(processedCommentArr);
        });
    }
  }, [postData]);

  useEffect(() => {
    const commentPageList = [];

    if (commentPageTotalCount <= 10 && commentPageTotalCount > 1) {
      for (let i = 1; i <= commentPageTotalCount; i++) {
        commentPageList.push(i);
      }
      setCurrCommentPageList(commentPageList);
    }

    if (
      commentPageTotalCount > 10 &&
      currCommentPage >= 1 &&
      currCommentPage < 7
    ) {
      for (let i = 1; i <= 10; i++) {
        commentPageList.push(i);
      }
      setCurrCommentPageList(commentPageList);
    }

    if (
      commentPageTotalCount > 10 &&
      currCommentPage > 6 &&
      currCommentPage < commentPageTotalCount - 4
    ) {
      for (let i = currCommentPage - 5; i < currCommentPage + 5; i++) {
        commentPageList.push(i);
      }
      setCurrCommentPageList(commentPageList);
    }

    if (
      commentPageTotalCount > 10 &&
      currCommentPage > commentPageTotalCount - 5
    ) {
      for (let i = commentPageTotalCount - 9; i <= commentPageTotalCount; i++) {
        commentPageList.push(i);
      }
      setCurrCommentPageList(commentPageList);
    }
  }, [currCommentPage, commentPageTotalCount]);

  const clickPageBtn = event => {
    setCurrCommentPage(Number(event.target.innerText));
  };

  const clickPrevCommentPageBtn = () => {
    if (commentPageTotalCount <= 10) {
      setCurrCommentPage(1);
    }
    if (commentPageTotalCount > 10 && currCommentPage > 10) {
      setCurrCommentPage(currCommentPage - 10);
    }
    if (commentPageTotalCount > 10 && currCommentPage <= 10) {
      setCurrCommentPage(1);
    }
  };

  const clickNextCommentPageBtn = () => {
    if (commentPageTotalCount <= 10) {
      setCurrCommentPage(commentPageTotalCount);
    }
    if (
      commentPageTotalCount > 10 &&
      currCommentPage + 10 > commentPageTotalCount
    ) {
      setCurrCommentPage(commentPageTotalCount);
    }
    if (
      commentPageTotalCount > 10 &&
      currCommentPage + 10 <= commentPageTotalCount
    ) {
      setCurrCommentPage(currCommentPage + 10);
    }
  };

  const clickEmail = event => {
    if (copyCheck) return;
    navigator.clipboard.writeText(event.target.innerText);
    setCopyCheck(true);
    setTimeout(() => {
      setCopyCheck(false);
    }, 2000);
  };

  const movePage = event => {
    if (event.target.innerText === '전체 보기') {
      navigate('/companyList');
    }
  };

  useEffect(() => {
    if (Object.keys(postData).length !== 0)
      fetch(
        `${process.env.REACT_APP_API_URI}/comment/${postData.id}?page=${currCommentPage}`,
        {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        }
      )
        .then(res => res.json())
        .then(data => setCommentData(data.data));
  }, [postData, currCommentPage]);

  const clickDeleteBtn = () => {
    fetch(`${process.env.REACT_APP_API_URI}/post/${postData.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
    });
  };

  const clickImg = event => {
    console.log(postData.companyImgUrl);
    console.log(event.target.backgroundImage);
    console.log(
      '수정',
      postData.companyImgUrl
        .replaceAll(('\\(', '\\('))
        .replaceAll(('\\)', '\\)'))
    );
  };

  return (
    <div className={css.postDetail}>
      <Header />
      <div className={css.wrapper}>
        <div className={css.progress} id="progBar"></div>
      </div>
      <div className={css.flexDiv}>
        <Sidebar />

        <div className={`${css.main}`}>
          <div
            onClick={movePage}
            className={`${css.category} ${css.topDonwMargin}`}
          >
            {categoryValue && categoryValue}
            {!categoryValue && '전체 보기'}
          </div>
          <div className={`${css.imgAndBtnDiv} ${css.topDonwMargin}`}>
            {postData.companyImgUrl && (
              <div
                className={`${css.img}`}
                onClick={clickImg}
                style={{
                  backgroundImage: `url('${encodeURI(
                    postData.companyImgUrl
                  )}')`,
                }}
              />
            )}

            {userInfo && postData && userInfo.id === postData.usersId && (
              <div className={`${css.btnDiv}`}>
                <button
                  onClick={e => navigate('/writePost', { state: '수정' })}
                  className={css.modifyBtn}
                >
                  수정
                </button>
                <div className={`${css.divider}`} />
                <button onClick={clickDeleteBtn} className={css.deleteBtn}>
                  삭제
                </button>
              </div>
            )}
          </div>
          {postData.companyName && (
            <div
              className={`${css.title} ${css.fontEmphasis} ${css.topDonwMargin}`}
            >
              {postData.companyName}
            </div>
          )}
          {postData.companyShortDesc && (
            <div className={`${css.topDonwMargin}`}>
              {postData.companyShortDesc}
            </div>
          )}
          {postData.mainBussinessTags && (
            <div className={`${css.workField} ${css.topDonwMargin}`}>
              <div className={`${css.fontEmphasis} ${css.fontEmphasisDiv}`}>
                업무 분야
              </div>
              <div>{postData.mainBussinessTags}</div>
            </div>
          )}
          {postData.fastfiveBenefitDesc && (
            <div className={`${css.memberBenefit} ${css.topDonwMargin}`}>
              <div className={`${css.fontEmphasis} ${css.fontEmphasisDiv}`}>
                멤버 혜택
              </div>
              <div>{postData.fastfiveBenefitDesc}</div>
            </div>
          )}
          {postData.homepageUrl && (
            <div className={`${css.homepage} ${css.topDonwMargin}`}>
              <div className={`${css.fontEmphasis} ${css.fontEmphasisDiv}`}>
                홈페이지
              </div>
              <Link to={postData.homepageUrl} target="_blank">
                {postData.homepageUrl}
              </Link>
            </div>
          )}

          {/* 이메일, 휴대폰 번호 분리 필요함 */}
          {postData.companyContactAddress && userGrade !== '입주예정자' && (
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
          )}
          {postData.companyLongDesc && (
            <div className={`${css.topDonwMargin}`}>
              {postData.companyLongDesc}
            </div>
          )}

          {/* 파일명 따로 보내준다고 함 */}
          {/* 파일명 클릭 시 파일 내용 다운로드되게 하기 */}
          {postData.companyInfoUrl && (
            <div className={`${css.introduce} ${css.topDonwMargin}`}>
              <div className={`${css.fontEmphasis} ${css.fontEmphasisDiv}`}>
                회사 소개서
              </div>
              <a href={postData.companyInfoUrl} target="_blank">
                첨부 파일 다운로드
              </a>
            </div>
          )}

          <div className={`${css.commentDiv}`} ref={commentDiv}>
            <div className={`${css.commentDivTitle}`}>댓글</div>

            {commentData &&
              commentData.map(commentObj => {
                return (
                  <Comment
                    key={commentObj.id}
                    commentObj={commentObj}
                    commentPageTotalCount={commentPageTotalCount}
                    setCurrCommentPageList={setCurrCommentPageList}
                    currCommentPage={currCommentPage}
                    setCommentData={setCommentData}
                    setCommentPageTotalCount={setCommentPageTotalCount}
                    totalCommentCount={totalCommentCount}
                    postData={postData}
                  />
                );
              })}

            <CommentInput
              commentPageTotalCount={commentPageTotalCount}
              currCommentPage={currCommentPage}
              setCommentData={setCommentData}
              setCommentPageTotalCount={setCommentPageTotalCount}
              totalCommentCount={totalCommentCount}
              postData={postData}
            />
          </div>
          <div className={`${css.commentPageDiv}`}>
            {commentPageTotalCount > 1 && (
              <button
                className={css.moveCommentPageBtn}
                onClick={clickPrevCommentPageBtn}
              >
                이전
              </button>
            )}

            {currCommentPageList &&
              currCommentPageList.map(elem => {
                return (
                  <button
                    className={css.commentPageBtn}
                    key={elem}
                    onClick={clickPageBtn}
                    style={{
                      backgroundColor:
                        elem === currCommentPage && 'rgb(236, 118, 111)',
                      color: elem === currCommentPage && 'white',
                    }}
                  >
                    {elem}
                  </button>
                );
              })}
            {commentPageTotalCount > 1 && (
              <button
                className={css.moveCommentPageBtn}
                onClick={clickNextCommentPageBtn}
              >
                다음
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PostDetail;
