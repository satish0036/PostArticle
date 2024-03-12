import { createSlice } from "@reduxjs/toolkit";

export const ArticleSlice = createSlice({
  name: "newData",
  initialState: [],
  reducers: {
    // addData: (state, action) => {
    //   console.log(action.payload)
    //   return action.payload;
    // },
    addNewArticle: (state, action) => {
      return [ ...state,  action.payload ];
    },
  },
});

export const { addData,addNewArticle } = ArticleSlice.actions;
export default ArticleSlice.reducer;
