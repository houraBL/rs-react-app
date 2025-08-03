import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CharacterInfo } from '../types/character';

interface SelectionState {
  selectedItems: Record<string, CharacterInfo>;
}

const initialState: SelectionState = {
  selectedItems: {},
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<CharacterInfo>) => {
      const character = action.payload;
      if (state.selectedItems[character.id]) {
        state.selectedItems = Object.fromEntries(
          Object.entries(state.selectedItems).filter(
            ([key]) => key !== String(character.id)
          )
        );
      } else {
        state.selectedItems = {
          ...state.selectedItems,
          [character.id]: character,
        };
      }
    },
    unselectAll: (state) => {
      state.selectedItems = {};
    },
  },
});

export const { toggleItem, unselectAll } = selectionSlice.actions;
export default selectionSlice.reducer;
