import React from 'react';
import Slider from 'react-slick';
import styles from './HeroSlider.module.scss';

interface HeroSliderProps {
  images: string[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ images }) => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    adaptiveHeight: true
  };

  return (
    <div className={styles.heroSlider}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className={styles.slide}>
            <img src={src} alt={`hero-slide-${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
