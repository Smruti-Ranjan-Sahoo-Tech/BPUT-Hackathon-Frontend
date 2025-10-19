import { configureStore } from "@reduxjs/toolkit";
import {createCrmApi} from "../RTK_Query/crmApi";

export const store = configureStore({
    reducer : {
        [createCrmApi.reducerPath]: createCrmApi.reducer
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(createCrmApi.middleware)
})

