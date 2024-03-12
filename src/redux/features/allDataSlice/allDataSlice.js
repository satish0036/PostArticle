import { createSlice } from "@reduxjs/toolkit";

export const AllDataSlice = createSlice({
  name: "newData",
  initialState: [{}],
  reducers: {
    addData: (state, action) => {
      console.log(action.payload)
      return action.payload;
    },
    addNewPost: (state, action) => {
      return { ...state, data1: [action.payload.formData, ...state.data1] };
    },
  },
});

export const { addData,addNewPost } = AllDataSlice.actions;
export default AllDataSlice.reducer;
