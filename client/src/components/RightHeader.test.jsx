import { render, screen } from '@testing-library/react';

import RightHeader from './RightHeader';

describe('RightHeader component', () => {
  it('Shows welcome form', () => {
    render(<RightHeader userEmail={'user@funnyvideos.com'} />);

    // Welcome form
    expect(screen.getByText('Welcome user@funnyvideos.com')).not.toBeNull();
  });
});
