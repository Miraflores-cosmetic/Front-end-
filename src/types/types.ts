export interface ProductBasteller {
  id: number;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  label?: string;
  image: string;
  hoverImage: string;
}
