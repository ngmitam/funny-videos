import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Share from './Share';

describe('Share component', () => {
  const initialState = {
    user: {
      email: 'admin@funnyvideos.com',
    },
  };

  const mockStore = configureStore();
  const store = mockStore(initialState);

  it('Shows Share form', () => {
    render(
      <Provider store={store}>
        <Router>
          <Share />
        </Router>
      </Provider>
    );

    // Share form
    expect(screen.getByText('Youtube URL')).not.toBeNull();

    // Share button
    expect(screen.getByText('Share')).not.toBeNull();
  });
});
