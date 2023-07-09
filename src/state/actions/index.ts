import { ActionType } from "../action-types";

interface SearchMoviesAction {
  type: ActionType.SEARCH_MOVIES;
}
interface SearchMoviesSuccessAction {
  type: ActionType.SEARCH_MOVIES_SUCCESS;
  payload: string[];
}
interface SearchMoviesErrorAction {
  type: ActionType.SEARCH_MOVIES_ERROR;
  payload: string;
}
export type Action =
  | SearchMoviesAction
  | SearchMoviesSuccessAction
  | SearchMoviesErrorAction;
