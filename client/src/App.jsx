import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './components/Header';

import routes from './routes';

function App() {
  return (
    <Container sx={{ margin: 'auto 10' }}>
      {/* Header */}
      <Header />

      {/* Content */}
      <Container sx={{ marginTop: '20px' }}>
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                element={route.main}
              />
            );
          })}
        </Routes>
      </Container>
    </Container>
  );
}

export default App;
