import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import AboutPage, { API_LINK, GIT_LINK, RSS_LINK } from './AboutPage';

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
    expect(apiLink).toHaveAttribute('href', API_LINK);
    expect(apiLink).toHaveAttribute('target', '_blank');
    expect(screen.getByAltText(/rick and morty api logo/i)).toBeInTheDocument();
  });

  it('Renders RS School link with image', () => {
    render(<AboutPage />);
    const rsLink = screen.getByRole('link', { name: /rs school/i });
    expect(rsLink).toHaveAttribute('href', RSS_LINK);
    expect(rsLink).toHaveAttribute('target', '_blank');
    expect(screen.getByAltText(/rs school logo/i)).toBeInTheDocument();
  });

  it('Renders GitHub link with image', () => {
    render(<AboutPage />);
    const gitHubLink = screen.getByRole('link', { name: /hourabl/i });
    expect(gitHubLink).toHaveAttribute('href', GIT_LINK);
    expect(gitHubLink).toHaveAttribute('target', '_blank');
    expect(screen.getByAltText(/github logo/i)).toBeInTheDocument();
  });
});
