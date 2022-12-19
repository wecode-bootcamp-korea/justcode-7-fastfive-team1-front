import React from 'react';
import css from './Home.module.scss';
import Header from '../../components/Header/Header';
import ServeHome from '../../components/ServeHome/ServeHome';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/Sidebar/Sidebar';

const Home = () => {
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
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <Header />
        <div className={css.progress} id="progBar"></div>
      </div>
      <div className={css.main}>
        <SideBar />
        <ServeHome />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
