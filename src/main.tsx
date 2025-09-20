import App from '@/App.tsx';
import { store } from '@app/store.ts';
import DetailsPanel from '@components/DetailsPanel/DetailsPanel.tsx';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary.tsx';
import AboutPage from '@pages/AboutPage';
import HomePage from '@pages/HomePage';
import NotFoundPage from '@pages/NotFoundPage';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),

    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ':pageId',
        element: <HomePage />,

        children: [
          {
            path: ':detailsId',
            element: <DetailsPanel />,
          },
        ],
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: '/not-found',
        element: <NotFoundPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
