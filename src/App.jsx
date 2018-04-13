import React from 'react';
import { Provider } from 'react-redux';

import {
  Container,
} from 'semantic-ui-react';

import Header from './components/Header.jsx';
import store from './redux/store.js';

function App() {
  return (
    // Provider shares store with components joined by connect()
    <Provider store={store}>
      <Container text textAlign='center'>
        <Header />
      </Container>
    </Provider>
  );
}

export default App;
