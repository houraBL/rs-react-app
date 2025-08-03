import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';
import userEvent from '@testing-library/user-event';

describe('Pagination', () => {
  const setup = (currentPage: number, totalPages: number) => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    );
    return { onPageChange };
  };
  it('Renders current page and total pages correctly', () => {
    setup(2, 5);
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
  });

  it('Calls onPageChange with correct page when Next is clicked', async () => {
    const { onPageChange } = setup(2, 5);
    await userEvent.click(screen.getByText('Next'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('Calls onPageChange with correct page when Prev is clicked', async () => {
    const { onPageChange } = setup(3, 5);
    await userEvent.click(screen.getByText('Prev'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('Disables Prev button on first page', () => {
    setup(1, 5);
    const prevBtn = screen.getByText('Prev') as HTMLButtonElement;
    expect(prevBtn).toBeDisabled();
  });

  it('Disables Next button on last page', () => {
    setup(5, 5);
    const nextBtn = screen.getByText('Next') as HTMLButtonElement;
    expect(nextBtn).toBeDisabled();
  });

  it('Enables both buttons when on a middle page', () => {
    setup(3, 5);
    expect(screen.getByText('Prev')).not.toBeDisabled();
    expect(screen.getByText('Next')).not.toBeDisabled();
  });
});
