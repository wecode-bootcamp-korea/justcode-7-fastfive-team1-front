import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import css from './Carousel.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const [carouselImg, setCarouselImg] = useState([]);

  useEffect(() => {
    fetch('/data/CarouselImage.json')
      .then(res => res.json())
      .then(res => setCarouselImg(res.data));
  }, []);

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
        {carouselImg.map(img => {
          return (
            <div key={img.id}>
              <img className={css.bannerImg} src={img.img} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Carousel;
