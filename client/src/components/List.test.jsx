import { render, screen } from '@testing-library/react';

import List from './List';

describe('Item component', () => {
  it('Shows list video', () => {
    const list = [
      {
        videoURL: 'https://youtu.be/bMknfKXIFA8',
        user: 'admin@funnyvideos.com',
      },
      {
        videoURL: 'https://youtu.be/bMknfKXIFA8',
        user: 'user@funnyvideos.com',
      },
    ];
    render(<List data={list} />);

    // Videos
    expect(screen.getByText('Shared by: admin@funnyvideos.com')).not.toBeNull();
    expect(screen.getByText('Shared by: user@funnyvideos.com')).not.toBeNull();
  });
});
