import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('Renders heading and description', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
    expect(
      screen.getByText(/this app was possible thanks to rick and morty api/i)
    ).toBeInTheDocument();
  });

  it('Renders Rick and Morti API link with image', () => {
    render(<AboutPage />);
    const apiLink = screen.getByRole('link', { name: /rick and morty api/i });
    expect(apiLink).toHaveAttribute('href', 'https://rickandmortyapi.com/');
    expect(apiLink).toHaveAttribute('target', '_blank');
    expect(screen.getByAltText(/rick and morty api logo/i)).toBeInTheDocument();
  });

  it('Renders RS School link with image', () => {
    render(<AboutPage />);
    const rsLink = screen.getByRole('link', { name: /rs school/i });
    expect(rsLink).toHaveAttribute('href', 'https://rs.school/');
    expect(rsLink).toHaveAttribute('target', '_blank');
    expect(screen.getByAltText(/rs school logo/i)).toBeInTheDocument();
  });

  it('Renders GitHub link with image', () => {
    render(<AboutPage />);
    const gitHubLink = screen.getByRole('link', { name: /hourabl/i });
    expect(gitHubLink).toHaveAttribute('href', 'https://github.com/houraBL');
    expect(gitHubLink).toHaveAttribute('target', '_blank');
    expect(screen.getByAltText(/github logo/i)).toBeInTheDocument();
  });
});
