import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { ThemeProvider } from '../../providers/ThemeProvider';
import userEvent from '@testing-library/user-event';

describe('Header', () => {
  vi.mock('../../assets/moon.svg', () => ({
    default: 'moon.svg',
  }));

  vi.mock('../../assets/sun.svg', () => ({
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
});
