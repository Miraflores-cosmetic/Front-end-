import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductBestSeller {
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

interface BestSellerState {
  // для одного текущего выбранного
  bestSeller: ProductBestSeller | null;
  // для массива всех выбранных
  bestSellers: ProductBestSeller[];
}

const initialState: BestSellerState = {
  bestSeller: null,
  bestSellers: [],
};

const bestSellerSlice = createSlice({
  name: "bestSellerSlice",
  initialState,
  reducers: {
    // заменяет текущее значение одиночного продукта
    setBestSeller(state, action: PayloadAction<ProductBestSeller>) {
      state.bestSeller = action.payload;
    },
    clearChosenProduct(state) {
      state.bestSeller = null;
    },

    // ---------- массив ----------
    addBestSellerToList(state, action: PayloadAction<ProductBestSeller>) {
      // добавляем только если такого id ещё нет
      const exists = state.bestSellers.some((p) => p.id === action.payload.id);
      if (!exists) {
        state.bestSellers.push(action.payload);
      }
    },
    removeChosenProduct(state, action: PayloadAction<number>) {
      // удаляем по id
      state.bestSellers = state.bestSellers.filter(
        (p) => p.id !== action.payload
      );
    },
    clearChosenProducts(state) {
      state.bestSellers = [];
    },
  },
});

export const {
  setBestSeller,
  clearChosenProduct,
  addBestSellerToList,
  removeChosenProduct,
  clearChosenProducts,
} = bestSellerSlice.actions;

export default bestSellerSlice.reducer;
