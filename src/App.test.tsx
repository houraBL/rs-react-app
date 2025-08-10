import App from '@/App';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

const DummyPage = () => <div>Test Page Content</div>;

describe('App', () => {
  it('renders Header, Outlet content, and Footer', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<DummyPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Test Page Content')).toBeInTheDocument();
    expect(screen.getByText(/rs school/i)).toBeInTheDocument();
  });
});
