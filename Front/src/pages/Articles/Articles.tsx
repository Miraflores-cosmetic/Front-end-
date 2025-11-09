import React from 'react';
import styles from './Articles.module.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import footerImage from '@/assets/images/footerImage.webp';

import linkedin from '@/assets/icons/linkedin.svg';
import iqs from '@/assets/icons/iqs.svg';
import facebook from '@/assets/icons/facebook.svg';
import insta from '@/assets/icons/insta.svg';
import art1 from '@/assets/images/art1.webp';
import art2 from '@/assets/images/art2.webp';
import art3 from '@/assets/images/art3.webp';

import { ArticleCard } from './ArticleCard/ArticleCard';
import { Article } from '@/store/slices/articleSlice';

const Articles: React.FC = () => {
  const articles: Article[] = [
    {
      id: 1,
      date: '30 Сентября 2025',
      title: 'Меристемные экстракты в натуральной косметике',
      author: 'Sargis',
      description:
        'Купаж гидролатов тысячелистника, мелиссы, листа земляники, зеленого чая, кипрея, мяты перечной; меристемный экстракт люпина, почек клена вязолистного и терна, экстракты розы, шалфея, примулы вечерней, мальвы, календулы, розмарина; экстракт комбучи, трипептид меди (copper tripeptide-1), экстракты клевера, солодки, хмеля; комплекс аминокислот, растительный ретинол (экстракт голубой водоросли ланаблю), ниацинамид,  фукогель, эктоин, гликосфинголипиды, аллантоин, глицерин, дигидрокверцетин, арабиногалактан, пентиленгликоль, глюконолактон, л глютаминовая кислота,   янтарная кислота, шаромикс 721',
      image: art1
    },
    {
      id: 2,
      date: '30 Сентября 2025',
      title: 'Будь в курсе с Мирафлорес',
      author: 'Sargis',
      description:
        'Купаж гидролатов тысячелистника, мелиссы, листа земляники, зеленого чая, кипрея, мяты перечной; меристемный экстракт люпина, почек клена вязолистного и терна, экстракты розы, шалфея, примулы вечерней, мальвы, календулы, розмарина; экстракт комбучи, трипептид меди (copper tripeptide-1), экстракты клевера, солодки, хмеля; комплекс аминокислот, растительный ретинол (экстракт голубой водоросли ланаблю), ниацинамид,  фукогель, эктоин, гликосфинголипиды, аллантоин, глицерин, дигидрокверцетин, арабиногалактан, пентиленгликоль, глюконолактон, л глютаминовая кислота,   янтарная кислота, шаромикс 721',
      image: art2
    },
    {
      id: 3,
      date: '30 Сентября 2025',
      title: 'Будь в курсе с Мирафлорес',
      author: 'Sargis',
      description:
        'Купаж гидролатов тысячелистника, мелиссы, листа земляники, зеленого чая, кипрея, мяты перечной; меристемный экстракт люпина, почек клена вязолистного и терна, экстракты розы, шалфея, примулы вечерней, мальвы, календулы, розмарина; экстракт комбучи, трипептид меди (copper tripeptide-1), экстракты клевера, солодки, хмеля; комплекс аминокислот, растительный ретинол (экстракт голубой водоросли ланаблю), ниацинамид,  фукогель, эктоин, гликосфинголипиды, аллантоин, глицерин, дигидрокверцетин, арабиногалактан, пентиленгликоль, глюконолактон, л глютаминовая кислота,   янтарная кислота, шаромикс 721',
      image: art3
    }
  ];

  return (
    <article className={styles.articlesContainer}>
      <Header />
      <section className={styles.titleContainer}>
        <p className={styles.title}>Будь в курсе с Мирафлорес</p>
        <p className={styles.desc}>ботаническая косметика С меристемными экстрактами</p>
        <div className={styles.socialWrapper}>
          <img className={styles.socialImage} src={facebook} alt='facebbok' />
          <img className={styles.socialImage} src={iqs} alt='iqs' />
          <img className={styles.socialImage} src={insta} alt='insta' />
          <img className={styles.socialImage} src={linkedin} alt='linkedin' />
        </div>
      </section>
      <section className={styles.articlesWrapper}>
        {articles.map((item, index) => (
          <ArticleCard
            key={item.id}
            article={item}
            reverse={index % 2 !== 0} // для чётных картинка слева, для нечётных справа
          />
        ))}
      </section>
      <Footer footerImage={footerImage} />
    </article>
  );
};

export default Articles;
