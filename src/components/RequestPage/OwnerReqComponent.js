import React from 'react';
import css from './OwnerReqComponent.module.scss';

function App() {
  return (
    <div className={css.requestPage}>
      <div className={css.requestItem}>
        <div>회사명</div>
        <div>임대기간</div>
        <div>이름</div>
        <div>이메일</div>
      </div>
    </div>
  );
}

export default App;
