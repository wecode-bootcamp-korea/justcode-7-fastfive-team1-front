import React from 'react';
import css from './Home.module.scss';
import Header from '../../components/Header/Header';

function Home() {

  return (
    <div className={css.container}>
      <Header />
    </div>
  );
}

export default Home;
