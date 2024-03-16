import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User= {
  _id: { $oid: string };
  name: string;
  email: string;
  profilePic: string;
}

type UserState={
  user: User | null;
}

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null } as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    updatePic: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.profilePic = action.payload;
      }
    },
  },
});

export const { setUser, updatePic } = userSlice.actions;

export default userSlice.reducer;
