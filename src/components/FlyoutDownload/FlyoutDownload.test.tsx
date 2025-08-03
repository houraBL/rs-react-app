import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FlyoutDownload from './FlyoutDownload';
import { mockCharacter } from '../../api/__mocks__/character-details';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import selectionReducer from '../../store/selectionSlice';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: { selection: selectionReducer },
  preloadedState: {
    selection: {
      selectedItems: { '1': mockCharacter },
    },
  },
});

describe('Character Card', () => {
  it('Downloads selected items and clears store', async () => {
    globalThis.URL.createObjectURL = vi.fn(() => 'blob:fake-url');

    const dispatchSpy = vi.spyOn(store, 'dispatch');
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
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'selection/unselectAll' });
  });
});
