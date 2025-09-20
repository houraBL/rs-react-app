import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ErrorButton from './ErrorButton';

describe('Error Button', () => {
  it('Renders ErrorButton', () => {
    render(<ErrorButton />);
    expect(screen.getByText('Create error')).toBeInTheDocument();
  });
});
