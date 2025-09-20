import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import MainLoader from './MainLoader';

describe('Main Loader', () => {
  it('Renders Main Loader', () => {
    render(<MainLoader />);
    expect(screen.getAllByTestId('bouncing-dot')).toHaveLength(3);
  });
});
