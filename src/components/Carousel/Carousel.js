import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import css from './Carousel.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow from './NextArrow';

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
    nextArrow: <NextArrow />,
    prevArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
        },
      },
    ],
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
