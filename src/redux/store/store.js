import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { imagesSlice } from "../reducers/imagesSlice";

export const store = createStore(imagesSlice, applyMiddleware(thunk));
