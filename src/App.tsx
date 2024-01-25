import React from 'react';
import { Provider } from 'react-redux';
import { Container } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import store from './store';
import router from './router';
import Nav from './components/nav';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const content = useRoutes(router);

  return (
    <Provider store={store}>
      <CssBaseline/>
      <Container>
        <div className="App">
          <Nav />
          {content}
        </div>
      </Container>
    </Provider>
  );
}

export default App;
