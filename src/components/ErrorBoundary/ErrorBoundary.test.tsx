import ErrorButton from '@components/ErrorButton';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import ErrorBoundary from './ErrorBoundary';

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
      expect(
        await screen.findByText('Something went wrong!')
      ).toBeInTheDocument();
      expect(await screen.findByText('Manual Error!')).toBeInTheDocument();
      expect(await screen.queryByText('Create error')).not.toBeInTheDocument();
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
