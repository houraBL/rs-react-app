import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';
import AboutPage from './pages/AboutPage/AboutPage.tsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx';
import DetailsPanel from './components/DetailsPanel/DetailsPanel.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
