import React, { useState } from 'react';
import styles from './BestSeller.module.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import footerImage from '@/assets/images/footerImage.webp';
import krem from '@/assets/images/krem.webp';
import girlwithsmile from '@/assets/images/girlsmile.webp';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import StarRating from '@/components/rating/StarRating';
import SizeTabs, { Option } from '@/components/size-tabs/SizeTabs';
import check from '@/assets/icons/tick-circle.svg';
import Etaps, { Etap } from '@/components/etpas/Etaps';
import AddToCartButton from '@/components/add-tobasket-button/AddToBasket';
import BestSellerTabs from '@/components/bestseller-card/bestseller-tabs/BestSellerTabs';
import Description from '@/components/bestseller-card/bestseller-product-desription/Description';
import BestSellerEtaps, {
  BestSellerEtap
} from '@/components/bestseller-card/bestseller-etaps/BestsellerEtaps';
import Bestsellers from '@/components/bestsellers/Bestsellers';
import { useScreenMatch } from '@/hooks/useScreenMatch';
import { addToCart } from '@/store/slices/cartSlice';

const BestSeller: React.FC = () => {
  const { bestSeller } = useSelector((state: RootState) => state.bestSellerSlice);
  const [activeSize, setActiveSize] = useState<Option | null>(null);
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();

  const productOptions = [
    { id: '50', label: '50 мл', price: 3590, oldPrice: 4800, discount: 20 },
    { id: '140', label: '140 мл', price: 7990, oldPrice: 4800, discount: 20 },
    {
      id: 'sample',
      label: 'Пробник',
      price: 500,
      oldPrice: 4800,
      discount: 20
    }
  ];

  const etapsData: Etap[] = [
    { id: 1, title: 'Этап 1', name: 'Очищение', icon: check },
    { id: 2, title: 'Подходит для', name: 'Всех типов кожи', icon: check },
    { id: 3, title: 'Подходит для', name: 'Всех типов кожи', icon: check }
  ];

  const bestSellerEtaps: BestSellerEtap[] = [
    { id: 1, title: 'Этап 1', name: 'Очищение' },
    { id: 2, title: 'Этап 2', name: 'Тонизация' },
    { id: 3, title: 'Этап 3', name: 'Питание и увлажнение' }
  ];

  const bestsellerTabsOptions = [
    {
      id: 'opt1',
      label: 'Описание',
      price: 1000,
      discount: 10,
      Content: () => <Description />
    },
    {
      id: 'opt2',
      label: 'Действие и эффект',
      price: 2000,
      oldPrice: 2500,
      Content: () => <div>Content2</div>
    },
    {
      id: 'opt3',
      label: 'Состав',
      price: 3000,
      Content: () => <div>Content3</div>
    },
    {
      id: 'opt4',
      label: 'Способ применения',
      price: 3000,
      Content: () => <div>Content3</div>
    },
    {
      id: 'opt5',
      label: 'Важно знать!',
      price: 3000,
      Content: () => <div>Content3</div>
    },
    {
      id: 'opt6',
      label: 'Комментарий Miraflores',
      price: 3000,
      Content: () => <div>Content3</div>
    }
  ];

  const products = [
    {
      id: 1,
      title: 'Энзимный мусс для умывания',
      description: 'Энзимы риса + фруктовые энзимы и фруктовые кислоты',
      price: 3590,
      oldPrice: 4600,
      discount: 22,
      image: krem,

      hoverImage: girlwithsmile
    },
    {
      id: 2,
      title: 'Энзимный мусс для умывания',
      description: 'Энзимы риса + фруктовые энзимы и фруктовые кислоты',
      price: 3590,
      oldPrice: 4600,
      discount: 22,
      image: krem,
      hoverImage: girlwithsmile
    },
    {
      id: 3,
      title: 'Цветочный мист',
      description: 'Мист для мягкой и сияющей кожи с экстрактом розы',
      price: 3590,
      oldPrice: 4600,
      discount: 23,
      image: krem,
      hoverImage: girlwithsmile
    },
    {
      id: 4,
      title: 'Цветочный мист',
      description: 'Мист для мягкой и сияющей кожи с экстрактом розы',
      price: 3590,
      label: 'Новинка',
      image: krem,
      hoverImage: girlwithsmile
    },
    {
      id: 5,
      title: 'Цветочный мист',
      description: 'Мист для мягкой и сияющей кожи с экстрактом розы',
      price: 3590,
      label: 'Новинка',
      image: krem,
      hoverImage: girlwithsmile
    },
    {
      id: 6,
      title: 'Цветочный мист',
      description: 'Мист для мягкой и сияющей кожи с экстрактом розы',
      price: 3590,
      label: 'Новинка',
      image: krem,
      hoverImage: girlwithsmile
    },
    {
      id: 7,
      title: 'Цветочный мист',
      description: 'Мист для мягкой и сияющей кожи с экстрактом розы',
      price: 3590,
      label: 'Новинка',
      image: krem,
      hoverImage: girlwithsmile
    }
  ];
  const isMobile = useScreenMatch(756);
  const handleSizeChange = (option: Option) => {
    setActiveSize(option);
    setAdded(false);
  };

  const handleAddToCart = () => {
    if (!activeSize || !bestSeller) return;
    dispatch(
      addToCart({
        itemId: bestSeller.id,
        product: bestSeller,
        size: activeSize.label
      })
    );
    setAdded(true);
  };

  return (
    <article className={styles.bestSellerContainer}>
      <Header />
      <main>
        <section className={styles.bestSellerInfo}>
          {!isMobile && (
            <article className={styles.imagePart}>
              <img src={bestSeller?.hoverImage} alt='bestSeller image' />
            </article>
          )}
          <article className={styles.infoPart}>
            <div className={styles.infoWrapper}>
              <p className={styles.title}>Цветочный мист с экстрактами розы</p>
              {isMobile && <img src={bestSeller?.hoverImage} alt='bestSeller image' />}{' '}
              <StarRating rating={4} text={'20 отзывов'} />
              <p className={styles.desc}>
                Мист для влажной, глянцевой кожи. Легкий, быстро впитывающийся гелевый мист,
                котораый заметно увлажняет и поддерживает здоровый барьер кожи
              </p>
              <SizeTabs options={productOptions} onChange={handleSizeChange} />
            </div>
            <div className={styles.bottomWrapper}>
              <Etaps items={etapsData} />
              <AddToCartButton
                onClick={handleAddToCart}
                defaultText={activeSize ? 'Добавить в корзину' : 'Выберите размер'}
                activeText={added ? 'Добавлено' : 'Добавить в корзину'}
                hoverText={activeSize ? 'Оформить Заказ' : 'Выберите размер'}
                // Disable button if no size selected
                disabled={!activeSize}
              />
            </div>
          </article>
        </section>
        <BestSellerTabs options={bestsellerTabsOptions} />{' '}
        <BestSellerEtaps items={bestSellerEtaps} />
        <Bestsellers products={products} isTitleHidden />
      </main>
      <Footer footerImage={footerImage} />
    </article>
  );
};

export default BestSeller;
