import {ADD_FAVORITE_ITEM, REMOVE_FAVORITE_ITEM} from './actions';

const initialState = {
  favorites: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE_ITEM:
      return {...state, favorites: [...state.favorites, action.payload]};
    case REMOVE_FAVORITE_ITEM:
      return {
        ...state,
        favorites: state.favorites.filter(
          ele => ele.char_id !== action.payload.char_id,
        ),
      };
    default:
      return state;
  }
};

export default rootReducer;
