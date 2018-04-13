import { createStore } from 'redux';
import { Map } from 'immutable';

import learnReact from 'redux/reducers.js';

// store holds the redux store that allows app-wide state to be shared
const store = createStore(learnReact, Map());

export default store;
