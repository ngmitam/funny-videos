import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Header from './Header';

describe('Header component', () => {
  const initialState = {
    user: {},
  };

  const mockStore = configureStore();
  const store = mockStore(initialState);

  it('Shows site title', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Funny Movies')).not.toBeNull();
  });

  it('Shows login form', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    expect(screen.getByText('email')).not.toBeNull();
    expect(screen.getByText('password')).not.toBeNull();
  });

  it('Shows login button', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Login / Register')).not.toBeNull();
  });

  it('Shows welcome form', () => {
    render(
      <Provider
        store={mockStore({
          ...initialState,
          user: {
            email: 'user@funyvideos.com',
          },
        })}
      >
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    // Welcome message
    expect(screen.getByText('Welcome user@funyvideos.com')).not.toBeNull();

    // Share button
    expect(screen.getByText('Share a movie')).not.toBeNull();

    // Logout button
    expect(screen.getByText('Logout')).not.toBeNull();
  });
});
