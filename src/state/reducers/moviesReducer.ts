import { ActionType } from "../action-types";
import { Action } from "../actions";

interface MovieState {
  loading: boolean;
  error: string | null;
  data: string[];
}
//this is the initial state
const initialState = {
  loading: false,
  error: null,
  data: [],
};
//reducer to handle multiple actions
const reducer = (
  state: MovieState = initialState,
  action: Action
): MovieState => {
  switch (action.type) {
    case ActionType.SEARCH_MOVIES:
      return { loading: true, error: null, data: [] };
    case ActionType.SEARCH_MOVIES_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionType.SEARCH_MOVIES_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default reducer;
