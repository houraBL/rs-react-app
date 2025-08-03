import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import DetailsPanel from './DetailsPanel';
import { fetchCharacterDetails } from '../../api/character-details';
import userEvent from '@testing-library/user-event';

vi.mock('../../api/character-details');
vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

const mockedUseParams = vi.mocked((await import('react-router-dom')).useParams);
const mockedFetchCharacters = vi.mocked(fetchCharacterDetails);
const mockNavigate = vi.fn();

describe('Details Panel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  describe('Rendering Tests', () => {
    it('Does not render anything when detailsId is missing', () => {
      mockedUseParams.mockReturnValue({ pageId: '1' });
      const { container } = render(
        <MemoryRouter>
          <DetailsPanel />
        </MemoryRouter>
      );

      expect(container).toBeEmptyDOMElement();
    });

    it('Displays item name and image correctly', async () => {
      mockedUseParams.mockReturnValue({ pageId: '1', detailsId: '1' });
      render(
        <MemoryRouter>
          <DetailsPanel />
        </MemoryRouter>
      );
      expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Status: Alive')).toBeInTheDocument();
      expect(screen.getByText('Species: Human')).toBeInTheDocument();
      expect(screen.getByText('Gender: Male')).toBeInTheDocument();
      expect(screen.getByText('Origin: Earth (C-137)')).toBeInTheDocument();
      expect(screen.getByAltText('Rick Sanchez')).toBeInTheDocument();
    });

    it('Handles missing props gracefully', async () => {
      mockedUseParams.mockReturnValue({ pageId: '1', detailsId: '999' });

      mockedFetchCharacters.mockImplementationOnce(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ result: null }), 0)
          )
      );
      render(
        <MemoryRouter>
          <DetailsPanel />
        </MemoryRouter>
      );
      expect(
        await screen.findByText('Character not found')
      ).toBeInTheDocument();
    });
  });

  describe('Handles Errors', () => {
    it('Handles Errors gracefully', async () => {
      mockedUseParams.mockReturnValue({ pageId: '1', detailsId: '15' });
      mockedFetchCharacters.mockRejectedValueOnce(
        new Error('Something went wrong')
      );
      render(
        <MemoryRouter>
          <DetailsPanel />
        </MemoryRouter>
      );

      expect(
        await screen.findByText(/Error: Something went wrong/i)
      ).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('Closes the card after click outside', async () => {
      mockedUseParams.mockReturnValue({ pageId: '1', detailsId: '1' });
      render(
        <MemoryRouter>
          <DetailsPanel />
        </MemoryRouter>
      );

      expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();

      await userEvent.click(document.body);

      await expect(mockNavigate).toHaveBeenCalledWith('/1', {
        replace: true,
      });
    });

    it('Ignores navigation if pagination was clicked', async () => {
      mockedUseParams.mockReturnValue({ pageId: '1', detailsId: '1' });
      render(
        <MemoryRouter>
          <DetailsPanel />
          <div data-role="pagination">Pagination</div>
        </MemoryRouter>
      );

      const pagination = screen.getByText('Pagination');
      await userEvent.click(pagination);

      await expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
