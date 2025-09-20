import selectionReducer from '@/utils/selectionSlice';
import { mockCharacter } from '@api/__mocks__/character-details';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';

import FlyoutDownload from './FlyoutDownload';

const store = configureStore({
  reducer: { selection: selectionReducer },
  preloadedState: {
    selection: {
      selectedItems: [mockCharacter],
    },
  },
});

describe('Character Card', () => {
  it('Downloads selected items when download item is clicked', async () => {
    globalThis.URL.createObjectURL = vi.fn(() => 'blob:fake-url');

    render(
      <Provider store={store}>
        <FlyoutDownload />
      </Provider>
    );

    const downloadButton = screen.getByText('Download');
    const link = screen.getByTestId('download-link');

    await userEvent.click(downloadButton);

    expect(globalThis.URL.createObjectURL).toHaveBeenCalled();
    expect(link.getAttribute('href')).toBe('blob:fake-url');
    vi.spyOn(link, 'click').mockImplementation(() => {});
  });

  it('Clears the store when Unselect all is clicked', async () => {
    globalThis.URL.createObjectURL = vi.fn(() => 'blob:fake-url');
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <FlyoutDownload />
      </Provider>
    );

    const unselectButton = screen.getByText('Unselect all');

    await userEvent.click(unselectButton);
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'selection/unselectAll' });
  });
});
