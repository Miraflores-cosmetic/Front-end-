import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openDrawer } from '@/store/slices/drawerSlice';
import styles from './HeaderLeft.module.scss';
import menu from '@/assets/icons/menu.svg';
import { useScreenMatch } from '@/hooks/useScreenMatch';

const HeaderLeft: React.FC = () => {
  const isMobile = useScreenMatch(850);
  const dispatch = useDispatch();

  return (
    <div>
      {isMobile ? (
        <button className={styles.menuButton} onClick={() => dispatch(openDrawer('menu'))}>
          <img src={menu} alt='menu' />
        </button>
      ) : (
        <nav className={styles.navLeft}>
          <Link to='/sets'>Наборы</Link>
          <Link to='/face'>Кожа</Link>
          <Link to='/hair'>Волосы</Link>
          <Link to='/oils'>Эфирные масла</Link>
        </nav>
      )}
    </div>
  );
};

export default HeaderLeft;
