import { combineReducers } from "redux";
import moviesReducer from "./moviesReducer";

const reducers = combineReducers({
  movies: moviesReducer,
});

export default reducers;
//this is the root state to be used in the store
export type RootState = ReturnType<typeof reducers>;
