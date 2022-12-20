import React from 'react';
import css from './ReqElem.module.scss';

function App({ userData, reqListElem, currUserClass }) {
  const clickMemberSubmitBtn = () => {
    fetch('http://localhost:5500/member', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        companyId: userData.company.id,
      }),
    });
  };

  const clickMemberRefuseBtn = () => {
    fetch('http://localhost:5500/member-request', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        requestId: reqListElem.id,
      }),
    });
  };

  const clickRepresentSubmitBtn = () => {
    fetch('http://localhost:5500/company', {
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
    });
  };

  const clickRepresentRefuseBtn = () => {
    fetch('http://localhost:5500/company-request', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        requestId: reqListElem.id,
      }),
    });
  };

  return (
    <div>
      {currUserClass === 'represent' && (
        <div className={css.memberReqMainElem} key={reqListElem.id}>
          <div>{reqListElem.usersId}</div>
          <div>{reqListElem.username}</div>
          <div>{reqListElem.email}</div>
          <div className={`${css.reqBtnDiv}`}>
            <button className={`${css.reqBtn}`} onClick={clickMemberSubmitBtn}>
              수락
            </button>
            <button className={`${css.reqBtn}`} onClick={clickMemberRefuseBtn}>
              거절
            </button>
          </div>
        </div>
      )}

      {currUserClass === 'admin' && (
        <div className={css.representReqMainElem} key={reqListElem.id}>
          <div>{reqListElem.companyName}</div>
          <div>{reqListElem.startDate}</div>
          <div>{reqListElem.endDate}</div>
          <div>{reqListElem.id}</div>
          <div>{reqListElem.usersId}</div>
          <div className={`${css.reqBtnDiv}`}>
            <button
              className={`${css.reqBtn}`}
              onClick={clickRepresentSubmitBtn}
            >
              수락
            </button>
            <button
              className={`${css.reqBtn}`}
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
