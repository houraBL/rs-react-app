import Footer from './Footer';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Footer', () => {
  it('Renders Footer', () => {
    render(<Footer />);
    expect(screen.getByText('RS School')).toBeInTheDocument();
    expect(screen.getByText('hourabl')).toBeInTheDocument();
  });
});
