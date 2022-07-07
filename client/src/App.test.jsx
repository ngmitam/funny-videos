import { render, screen } from '@testing-library/react';
import App from './App';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';

describe('Home Page', () => {
  const initialState = {
    user: {},
    video: {
      list: [],
    },
  };
  const mockStore = configureStore();
  let store;

  it('Shows Home page', () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    // Site title
    expect(screen.getByText('Funny Movies')).not.toBeNull();

    // Login form
    expect(screen.getByText('email')).not.toBeNull();
    expect(screen.getByText('password')).not.toBeNull();

    // Login button
    expect(screen.getByText('Login / Register')).not.toBeNull();
  });

  it('Shows list of videos', () => {
    store = mockStore({
      ...initialState,
      video: {
        list: [
          {
            videoURL: 'https://youtu.be/bMknfKXIFA8',
            user: 'user@funnymovies.com',
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    // List of videos
    expect(screen.getByText('Shared by: user@funnymovies.com')).not.toBeNull();
  });

  it('Shows Home page with user logged in', () => {
    store = mockStore({
      ...initialState,
      user: {
        email: 'admin@funnyvideos.com',
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    // Welcome message
    expect(screen.getByText('Welcome admin@funnyvideos.com')).not.toBeNull();

    // Share button
    expect(screen.getByText('Share a movie')).not.toBeNull();

    // Logout button
    expect(screen.getByText('Logout')).not.toBeNull();
  });

  it('Return home if user access /share without login', () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Site title
    expect(screen.getByText('Funny Movies')).not.toBeNull();

    // Login form
    expect(screen.getByText('email')).not.toBeNull();
    expect(screen.getByText('password')).not.toBeNull();

    // Login button
    expect(screen.getByText('Login / Register')).not.toBeNull();
  });

  it('Show share page if user access /share after login', () => {
    store = mockStore({
      ...initialState,
      user: {
        email: 'user@funnyvideos.com',
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/share']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Site title
    expect(screen.getByText('Funny Movies')).not.toBeNull();

    // Welcome message
    expect(screen.getByText('Welcome user@funnyvideos.com')).not.toBeNull();

    // Share button
    expect(screen.getByText('Share a movie')).not.toBeNull();

    // Logout button
    expect(screen.getByText('Logout')).not.toBeNull();

    // Share form
    expect(screen.getByText('Youtube URL')).not.toBeNull();

    // Share button
    expect(screen.getByText('Share')).not.toBeNull();
  });
});
