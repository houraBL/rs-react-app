import { ThemeProvider } from '@/providers/ThemeProvider';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import Header from './Header';

describe('Header', () => {
  vi.mock('@assets/icon-moon.svg', () => ({
    default: 'moon.svg',
  }));

  vi.mock('@assets/icon-sun.svg', () => ({
    default: 'sun.svg',
  }));

  it('Renders Header', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('Changes theme button src and alt', async () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>
    );
    const themeButton = screen.getByRole('button');
    const imgage = screen.getByRole('img');
    expect(imgage).toHaveAttribute('src', expect.stringContaining('moon.svg'));
    expect(imgage).toHaveAttribute('alt', 'Dark theme');
    await userEvent.click(themeButton);
    expect(imgage).toHaveAttribute('src', expect.stringContaining('sun.svg'));
    expect(imgage).toHaveAttribute('alt', 'Light theme');
    await userEvent.click(themeButton);
    expect(imgage).toHaveAttribute('src', expect.stringContaining('moon.svg'));
    expect(imgage).toHaveAttribute('alt', 'Dark theme');
  });

  it('Throws error when outside of theme provider', async () => {
    expect(() =>
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      )
    ).toThrow('no ThemeProvider');
  });
});
