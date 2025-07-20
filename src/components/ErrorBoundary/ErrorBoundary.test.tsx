import ErrorBoundary from './ErrorBoundary';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorButton from '../ErrorButton/ErrorButton';
import userEvent from '@testing-library/user-event';

describe('Error Boundary', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('Error Catching Tests', () => {
    it('Catches and handles JavaScript errors in child components', async () => {
      render(
        <ErrorBoundary>
          <ErrorButton />
        </ErrorBoundary>
      );
      await userEvent.click(screen.getByText('Create error'), { delay: null });
      expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    });

    it('Displays fallback UI when error occurs', async () => {
      render(
        <ErrorBoundary>
          <ErrorButton />
        </ErrorBoundary>
      );
      await userEvent.click(screen.getByText('Create error'), { delay: null });
      expect(screen.queryAllByText('Create error')).toHaveLength(0);
      expect(screen.getByText('Manual Error!')).toBeInTheDocument();
    });

    it('Logs error to console', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      render(
        <ErrorBoundary>
          <ErrorButton />
        </ErrorBoundary>
      );
      await userEvent.click(screen.getByText('Create error'), { delay: null });
      expect(errorSpy).toHaveBeenCalledWith(
        'Caught by ErrorBoundary:',
        expect.any(Error),
        expect.any(Object)
      );
      errorSpy.mockRestore();
    });
  });

  describe('Reset button', () => {
    it('Renders reset button', async () => {
      render(
        <ErrorBoundary>
          <ErrorButton />
        </ErrorBoundary>
      );
      await userEvent.click(screen.getByText('Create error'), { delay: null });
      expect(screen.getByText('Reset App')).toBeInTheDocument();
    });

    it('Resets error and re-renders app', async () => {
      render(
        <ErrorBoundary>
          <ErrorButton />
        </ErrorBoundary>
      );
      expect(screen.queryAllByText('Create error')).toHaveLength(1);
      await userEvent.click(screen.getByText('Create error'), { delay: null });
      expect(screen.queryAllByText('Create error')).toHaveLength(0);
      await userEvent.click(screen.getByText('Reset App'), { delay: null });
      expect(screen.queryAllByText('Create error')).toHaveLength(1);
    });
  });
});
