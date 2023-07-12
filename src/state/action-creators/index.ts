import axios from "axios";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Dispatch } from "redux";

export const searchMovies = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
    // this will change the loading state to true
    dispatch({
      type: ActionType.SEARCH_MOVIES,
    });

    try {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?s=${term}&page=1&apikey=dfa8820e`
      );
  
    // this will changing the loading state to false and the data state to the data we get from the api
      dispatch({
        type: ActionType.SEARCH_MOVIES_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      // if there is an Error this will change the loading state to false and the error state to the error message
      dispatch({
        type: ActionType.SEARCH_MOVIES_ERROR,
        payload: err.message,
      });
    }
  };
};
