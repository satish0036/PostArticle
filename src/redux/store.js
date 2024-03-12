import { configureStore } from "@reduxjs/toolkit"
import AllDataReducer from "./features/allDataSlice/allDataSlice.js"
import AllArticleSliceReducer from "./features/articleSlice/articleSlice.js"
export default configureStore({
    reducer: {
        AllNewData: AllDataReducer,
        AllNewArticle:AllArticleSliceReducer

    }
})