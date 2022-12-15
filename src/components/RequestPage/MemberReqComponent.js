import React from 'react';
import css from './MemberReqComponent.module.scss';

function App() {
  return (
    <div className={css.requestPage}>
      <div className={css.Main}>
        <div className={css.requestList}>
          <div>대표요청1</div>
          <div>대표요청1</div>
          <div>대표요청1</div>
          <div>대표요청1</div>
          <div>대표요청1</div>
          <div>대표요청1</div>
          <div>대표요청1</div>
          <div>대표요청1</div>
        </div>
        <div className={css.setting}>설정1</div>
      </div>
    </div>
  );
}

export default App;
