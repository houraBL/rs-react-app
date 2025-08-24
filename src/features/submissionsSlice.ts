import type { Submission } from '@app/types';
import { type PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';

export interface SubmissionsState {
  items: Submission[];
  lastAddedId: string | null;
}

const initialState: SubmissionsState = {
  items: [],
  lastAddedId: null,
};

type AddSubmissionPayload = Omit<Submission, 'id' | 'createdAt'>;

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    addSubmission: {
      prepare: (payload: AddSubmissionPayload) => ({
        payload: {
          ...payload,
          id: nanoid(),
          createdAt: Date.now(),
        } satisfies Submission,
      }),
      reducer: (state, action: PayloadAction<Submission>) => {
        state.items.unshift(action.payload);
        state.lastAddedId = action.payload.id;
      },
    },
    clearHighlight(state) {
      state.lastAddedId = null;
    },
  },
});

export const { addSubmission, clearHighlight } = submissionsSlice.actions;
export default submissionsSlice.reducer;
