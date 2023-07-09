import axios from "axios";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Dispatch } from "redux";

export const searchMovies = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SEARCH_MOVIES,
    });

    try {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?i=${term}&apikey=${process.env.OMDB_API_KEY}`
      );

      const movies = data.objects.map((result: any) => {
        return result;
      });

      dispatch({
        type: ActionType.SEARCH_MOVIES_SUCCESS,
        payload: movies,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.SEARCH_MOVIES_ERROR,
        payload: err.message,
      });
    }
  };
};
