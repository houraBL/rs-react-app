'use client';

import { store } from '@/app/store';
import ErrorBoundary from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Provider } from 'react-redux';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
