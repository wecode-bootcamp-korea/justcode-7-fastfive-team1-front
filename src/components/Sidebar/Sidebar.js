import React from 'react';
import css from './Sidebar.module.scss';

function SideBar() {
  return (
    <div className={css.main}>
      <div>멤버 소개</div>
      <div>00 요청</div>
    </div>
  );
}

export default SideBar;
