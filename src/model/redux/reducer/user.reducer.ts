import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const selectUser = (state: RootState) => state.user;

type User = {
  id: number | null;
};

const initialState: User = {
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAdded(
      state,
      action: PayloadAction<{
        id: number;
      }>
    ) {
      state.id = action.payload.id;
    },
  },
});

export const { userAdded } = userSlice.actions;
export const { reducer: userReducer } = userSlice;
