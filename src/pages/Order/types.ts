export interface CardItem {
  id: number;
  image: string;
  alt: string;
  name: string;
  size: string;
  discount: string;
  count: string;
  priceOld?: string;
  priceNew?: string;
  isGift?: boolean;
}

interface Product {
  id: number;
  name: string;
  size: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  image: string;
  isGift?: boolean;
}

export interface TotalAccordionProps {
  total: number;
  totalOld?: number;
  products: Product[];
  discount?: number;
  promo?: number;
}
