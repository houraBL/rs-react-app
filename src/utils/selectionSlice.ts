import type { CharacterInfo } from '@/types/characterInfo';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SelectionState {
  selectedItems: CharacterInfo[];
}

const initialState: SelectionState = {
  selectedItems: [],
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<CharacterInfo>) => {
      const payloadCharacter = action.payload;
      const exists = state.selectedItems.some(
        (character) => character.id === payloadCharacter.id
      );

      if (exists) {
        state.selectedItems = state.selectedItems.filter(
          (character) => character.id !== payloadCharacter.id
        );
      } else {
        state.selectedItems.push(payloadCharacter);
      }
    },

    unselectAll: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { toggleItem, unselectAll } = selectionSlice.actions;
export default selectionSlice.reducer;
