import { render, screen } from '@testing-library/react';

import LoginForm from './LoginForm';

describe('LoginForm component', () => {
  it('Shows Loin form', () => {
    render(<LoginForm />);

    // Login form
    expect(screen.getByText('email')).not.toBeNull();
    expect(screen.getByText('password')).not.toBeNull();

    // Login button
    expect(screen.getByText('Login / Register')).not.toBeNull();
  });
});
