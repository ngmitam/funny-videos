import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Home from './Home';

describe('Home component', () => {
  const initialState = {
    user: {},
    video: {
      list: [
        {
          videoURL: 'https://youtu.be/bMknfKXIFA8',
          user: 'admin@funnyvideos.com',
        },
        {
          videoURL: 'https://youtu.be/bMknfKXIFA8',
          user: 'user@funnyvideos.com',
        },
      ],
    },
  };

  const mockStore = configureStore();
  const store = mockStore(initialState);

  it('Shows list of videos', () => {
    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    // List of videos
    expect(screen.getByText('Shared by: admin@funnyvideos.com')).not.toBeNull();
    expect(screen.getByText('Shared by: user@funnyvideos.com')).not.toBeNull();
  });
});
