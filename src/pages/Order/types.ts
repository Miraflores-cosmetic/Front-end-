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
