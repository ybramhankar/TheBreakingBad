export const ADD_FAVORITE_ITEM = 'ADD_FAVORITE_ITEM';
export const REMOVE_FAVORITE_ITEM = 'REMOVE_FAVORITE_ITEM';

export const addFavorite = data => ({
  type: ADD_FAVORITE_ITEM,
  payload: data,
});

export const removeFavorite = data => ({
  type: REMOVE_FAVORITE_ITEM,
  payload: data,
});
