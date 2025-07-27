import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DetailsPanel from './DetailsPanel';
import { fetchCharacterDetails } from '../../api/character-details';

vi.mock('../../api/character-details');
vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: () => vi.fn(),
  };
});

const mockedUseParams = vi.mocked((await import('react-router-dom')).useParams);

describe('Details Panel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    it('Does not render anything when detailsId is missing', () => {
      mockedUseParams.mockReturnValue({ page: '1' });
      const { container } = render(
        <MemoryRouter>
          <DetailsPanel />
        </MemoryRouter>
      );

      expect(container).toBeEmptyDOMElement();
    });

    it('Displays item name and image correctly', async () => {
      mockedUseParams.mockReturnValue({ page: '1', detailsId: '1' });
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
      mockedUseParams.mockReturnValue({ page: '1', detailsId: '999' });
      const mockedFetchCharacters = vi.mocked(fetchCharacterDetails);

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
});
