import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Article {
  id: number;
  date: string;
  title: string;
  description: string;
  author: string;
  image: string;
}

interface ArticleState {
  // текущая выбранная статья
  article: Article | null;
}

const initialState: ArticleState = {
  article: null,
};

const articleSlice = createSlice({
  name: "articleSlice",
  initialState,
  reducers: {
    setArticle(state, action: PayloadAction<Article>) {
      state.article = action.payload;
    },
    clearArticle(state) {
      state.article = null;
    },
  },
});

export const { setArticle, clearArticle } = articleSlice.actions;

export default articleSlice.reducer;
