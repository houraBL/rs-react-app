import ErrorButton from './ErrorButton';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Error Button', () => {
  it('Renders ErrorButton', () => {
    render(<ErrorButton />);
    expect(screen.getByText('Create error')).toBeInTheDocument();
  });
});
