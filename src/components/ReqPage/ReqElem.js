import React from 'react';
import css from './ReqElem.module.scss';

function App({ userData, reqListElem, currUserClass, setReqData }) {
  const clickMemberSubmitBtn = () => {
    fetch(`${process.env.REACT_APP_API_URI}/member`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        companyId: userData.userInfo.company.id,
        requestId: reqListElem.id,
        userId: reqListElem.usersId,
      }),
    })
      .then(res => res.json())
      .then(data => {
        fetch(`${process.env.REACT_APP_API_URI}/member-request`, {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        })
          .then(res => res.json())
          .then(data => setReqData(data.memberList));

        if (data.message === 'APPROVE_SUCCESSFULLY') {
          alert('멤버 요청이 승인되었습니다');
        }
      });
  };

  const clickMemberRefuseBtn = () => {
    fetch(`${process.env.REACT_APP_API_URI}/member-request`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        requestId: reqListElem.id,
      }),
    })
      .then(res => res.json())
      .then(data => {
        fetch(`${process.env.REACT_APP_API_URI}/member-request`, {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        })
          .then(res => res.json())
          .then(data => {
            setReqData(data.memberList);
          });

        if (data.message === 'REFUSE_SUCCESSFULLY') {
          alert('멤버 요청이 거부되었습니다');
        }
      });
  };

  const clickRepresentSubmitBtn = () => {
    fetch(`${process.env.REACT_APP_API_URI}/company`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        companyName: reqListElem.companyName,
        startDate: reqListElem.startDate,
        endDate: reqListElem.endDate,
        userId: reqListElem.usersId,
        requestId: reqListElem.id,
      }),
    })
      .then(res => res.json())
      .then(data => {
        fetch(`${process.env.REACT_APP_API_URI}/company-request`, {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        })
          .then(res => res.json())
          .then(data => {
            window.location.reload();
          });

        if (data.message === 'APPROVE_SUCCESSFULLY') {
          alert('대표 요청이 승인되었습니다');
        }
      });
  };

  const clickRepresentRefuseBtn = () => {
    fetch(`${process.env.REACT_APP_API_URI}/company-request`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        requestId: reqListElem.id,
      }),
    })
      .then(res => res.json())
      .then(data => {
        fetch(`${process.env.REACT_APP_API_URI}/company-request`, {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        })
          .then(res => res.json())
          .then(data => {
            window.location.reload();
          });

        if (data.message === 'REFUSE_SUCCESSFULLY') {
          alert('대표 요청이 거부되었습니다');
        }
      });
  };

  return (
    <div>
      {currUserClass === 'represent' && (
        <div className={css.memberReqMainElem} key={reqListElem.id}>
          <div className={css.memberReqMainElemCellDiv}>
            <div className={css.memberReqMainElemCell}>
              USER ID: {reqListElem.usersId}
            </div>
            <div className={css.memberReqMainElemCell}>
              USER NAME: {reqListElem.username}
            </div>
            <div className={css.memberReqMainElemCell}>
              E-mail: {reqListElem.email}
            </div>
          </div>

          <div className={`${css.reqBtnDiv}`}>
            <button
              className={`${css.reqBtn} ${css.leftBtn}`}
              onClick={clickMemberSubmitBtn}
            >
              수락
            </button>
            <button
              className={`${css.reqBtn} ${css.rightBtn}`}
              onClick={clickMemberRefuseBtn}
            >
              거절
            </button>
          </div>
        </div>
      )}

      {currUserClass === 'admin' && (
        <div className={css.representReqMainElem} key={reqListElem.id}>
          <div className={css.representReqMainElemCellDiv}>
            <div className={css.representReqMainElemCell}>
              COMPANY NAME: {reqListElem.companyName}
            </div>
            <div className={css.representReqMainElemCell}>
              START DATE: {reqListElem.startDate}
            </div>
            <div className={css.representReqMainElemCell}>
              END DATE: {reqListElem.endDate}
            </div>
            <div className={css.representReqMainElemCell}>
              {' '}
              REQUEST ID:{reqListElem.id}
            </div>
            <div className={css.representReqMainElemCell}>
              USER ID: {reqListElem.usersId}
            </div>
          </div>
          <div className={`${css.reqBtnDiv}`}>
            <button
              className={`${css.reqBtn} ${css.leftBtn}`}
              onClick={clickRepresentSubmitBtn}
            >
              수락
            </button>
            <button
              className={`${css.reqBtn} ${css.rightBtn}`}
              onClick={clickRepresentRefuseBtn}
            >
              거절
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
