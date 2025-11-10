import { Product } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string; 
  product: Product;
  quantity: number;
  size: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface AddItemPayload {
  itemId: number;
  product: Product;
  size: string;
}

interface UpdateQuantityPayload {
  id: string;        
  quantity: number;  
}

const loadCartFromLocalStorage = (): Cart => {
  if (typeof window === "undefined") {
    return { items: [], totalItems: 0, totalPrice: 0 };
  }

  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : { items: [], totalItems: 0, totalPrice: 0 };
  } catch {
    return { items: [], totalItems: 0, totalPrice: 0 };
  }
};

const saveCartToLocalStorage = (state: Cart) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(state));
  }
};

const initialState: Cart = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<AddItemPayload>) {
      const { itemId, product, size } = action.payload;
      const id = `${itemId}-${size}`; 

      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id,
          product,
          quantity: 1,
          size
        });
      }

      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

      saveCartToLocalStorage(state);
    },

    updateQuantity(state, action: PayloadAction<UpdateQuantityPayload>) {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);

      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter(i => i.id !== id);
      } else {
        item.quantity = quantity;
      }

      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

      saveCartToLocalStorage(state);
    },

    clearCart(state) {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;

      saveCartToLocalStorage(state);
    }
  }
});

export const { addToCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
