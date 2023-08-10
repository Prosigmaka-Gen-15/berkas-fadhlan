import { createSelector } from 'reselect';

const selectUser = (state) => state.auth;

export const selectLogin = createSelector([selectUser], (auth) => auth.isLoggedIn);
