import Footer from './Footer';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Footer', () => {
  it('Renders Footer', () => {
    render(<Footer />);
    expect(screen.getByText('RS School')).toHaveAttribute(
      'href',
      'https://rs.school/'
    );
    expect(screen.getByText('hourabl')).toHaveAttribute(
      'href',
      'https://github.com/houraBL'
    );
    expect(screen.getByAltText('RS School logo')).toBeInTheDocument();
    expect(screen.getByAltText('GitHub logo')).toBeInTheDocument();
  });
});
