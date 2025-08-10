import { GIT_LINK, RSS_LINK } from '@pages/AboutPage/AboutPage';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Footer from './Footer';

describe('Footer', () => {
  it('Renders Footer', () => {
    render(<Footer />);
    expect(screen.getByText('RS School')).toHaveAttribute('href', RSS_LINK);
    expect(screen.getByText('hourabl')).toHaveAttribute('href', GIT_LINK);
    expect(screen.getByAltText('RS School logo')).toBeInTheDocument();
    expect(screen.getByAltText('GitHub logo')).toBeInTheDocument();
  });
});
