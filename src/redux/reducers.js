import { OrderedMap } from 'immutable';
import { combineReducers } from 'redux-immutable';

import {

} from './actions.js';

function reduce(state = OrderedMap(), action) {
  switch (action.type) {
    
    default:
      return state;
  }
}

export default combineReducers({
  reduce,
});
