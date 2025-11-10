import React, { useState } from 'react';
import styles from './AddToBasket.module.scss';
import blackBasketTrash from '@/assets/icons/blackBasketTrash.svg';
import whiteBasketTrash from '@/assets/icons/whiteBasketTrash.svg';
import add from '@/assets/icons/add.svg';
import minus from '@/assets/icons/minus.svg';

interface AddToCartButtonProps {
  defaultText?: string;
  hoverText?: string;
  activeText?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  defaultText = 'Добавить в корзину',
  hoverText = 'Оформить Заказ',
  activeText = 'Добавлено',
  onClick,
  disabled = false
}) => {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [iconHovered, setIconHovered] = useState(false); // <— for the icon

  const handleAdd = () => {
    if (disabled) return;
    setCount(prev => prev + 1);
    if (onClick) onClick();
  };

  const handleRemove = () => {
    setCount(prev => Math.max(prev - 1, 0));
  };

  const buttonText = count === 0 ? (isHovered ? hoverText : defaultText) : activeText;

  return (
    <div className={styles.wrapper}>
      {count === 0 ? (
        <button
          onClick={handleAdd}
          className={styles.mainBtn}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          type='button'
          disabled={disabled}
        >
          {buttonText}
        </button>
      ) : (
        <div className={styles.mainWrapper}>
          <img src={add} alt='basket icon' onClick={handleAdd} />

          <span className={styles.count}>{count}</span>
          <img src={minus} alt='basket icon' onClick={handleRemove} />
        </div>
      )}

      <div
        className={styles.iconCircle}
        onMouseEnter={() => setIconHovered(true)}
        onMouseLeave={() => setIconHovered(false)}
      >
        <img src={iconHovered ? whiteBasketTrash : blackBasketTrash} alt='basket icon' />
      </div>
    </div>
  );
};

export default AddToCartButton;
