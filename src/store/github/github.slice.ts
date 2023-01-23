import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const LS_FAV_KEY = 'rfk';
const LS_REPO_KEY = 'rrk';
interface IGithubState {
  favourites: string[];
  // userRepos: string[];
}

const initialState: IGithubState = {
  //при перезагрузке будет в редакс с localStorage добавлятся
  favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]'),
};

export const githubSlice = createSlice({
  name: 'favouriteRepos',
  initialState,
  reducers: {
    // addUserRepos(state, action: PayloadAction<string>) {
    //   state.userRepos.push(action.payload);
    //   localStorage.setItem(LS_REPO_KEY, JSON.stringify(state.userRepos));
    // },
    addFavourite(state, action: PayloadAction<string>) {
      state.favourites.push(action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
    },
    removeFavourite(state, action: PayloadAction<string>) {
      state.favourites = state.favourites.filter((f) => f !== action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
    },
  },
});

export const githubActions = githubSlice.actions;
export const githubReducer = githubSlice.reducer;
