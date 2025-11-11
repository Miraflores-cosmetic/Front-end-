import React from 'react';
import Slider from 'react-slick';
import styles from './Bestsellers.module.scss';
import { ProductCard } from './product-card/ProductCard';
import { Product } from '@/types/types';
import { useScreenMatch } from '@/hooks/useScreenMatch';
import { useWindowWidth } from '@/hooks/useWindowWidth';

interface BestsellersProps {
  products: Product[];
  isTitleHidden?: boolean;
  slidesToShow?: number;
}

export default function Bestsellers({
  products,
  isTitleHidden,
  slidesToShow = 3.3
}: BestsellersProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    draggable: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,

    afterChange: (current: number) => {
      const num = Number.isInteger(current) ? current : Math.ceil(current);
      setActiveIndex(num);
    },
    customPaging: (i: number) => (
      <div className={`${styles.customDot} ${i === activeIndex ? styles.activeDot : ''}`}></div>
    ),

    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3.1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2.3,
          slidesToScroll: 1,
          arrows: false,
          centerMode: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          arrows: false,
          centerMode: false
        }
      },
      {
        breakpoint: 610,
        settings: {
          slidesToShow: 1.1,

          slidesToScroll: 1,
          dots: false
        }
      },

      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1.3,

          slidesToScroll: 1,
          dots: false
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1.2,

          slidesToScroll: 1,
          dots: false
        }
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 1.1,

          slidesToScroll: 1,
          dots: false
        }
      },

      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1.2,

          slidesToScroll: 1,
          dots: false
        }
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1.1,

          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };
  const width = useWindowWidth();

  const isOversize = useScreenMatch(1536);
  const x = isOversize ? undefined : (width - 1536) / 2 - 16;

  return (
    <section className={styles.bestsellers} style={isOversize ? undefined : { marginLeft: x }}>
      {!isTitleHidden && <h2 className={styles.title}>Бестселлеры</h2>}
      <Slider {...settings} className={styles.slider}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Slider>
    </section>
  );
}
