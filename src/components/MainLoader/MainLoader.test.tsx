import MainLoader from './MainLoader';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Main Loader', () => {
  it('Renders Main Loader', () => {
    render(<MainLoader />);
    expect(screen.getAllByTestId('bouncing-dot')).toHaveLength(3);
  });
});
