import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actionCreators, dispatch);
  //this is the result that will be retured from this hook, if there are many actions, we can use this hook to dispatch them all
  // {searchRepositories: dispatch(searchRepositories())} 
}