import React from 'react';
import Slider from 'react-slick';
import css from './Carousel.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    nextArrow: (
      <img
        className={css.nextBtn}
        src="./image/arrow-right.png"
        alt="다음 페이지"
      />
    ),
    prevArrow: (
      <img
        className={css.prevBtn}
        src="./image/arrow-left.png"
        alt="이전 페이지"
      />
    ),
  };
  return (
    <div className={css.carouselContainer}>
      <Slider {...settings}>
        <div>
          <img
            className={css.img}
            src="https://images.unsplash.com/photo-1551383616-a9e150c07fca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          />
        </div>
        <div>
          <img
            className={css.img}
            src="https://images.unsplash.com/photo-1533182390818-fb24be7ca4e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          />
        </div>
        <div>
          <img
            className={css.img}
            src="https://images.unsplash.com/photo-1589981941324-27c29919de98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80"
          />
        </div>
        <div>
          <img
            className={css.img}
            src="https://images.unsplash.com/photo-1604759695540-3012f9682c28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          />
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;
