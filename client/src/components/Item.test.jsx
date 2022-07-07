import { render, screen } from '@testing-library/react';

import Item from './Item';

describe('Item component', () => {
  it('Shows video', () => {
    render(
      <Item
        videoURL={'https://youtu.be/bMknfKXIFA8'}
        user={'user@funnyvideos.com'}
      />
    );

    // Video
    expect(screen.getByText('Shared by: user@funnyvideos.com')).not.toBeNull();
  });
});
