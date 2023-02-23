import { ADD_MOVIES } from "../actions/action";
import { ADD_FAVOURITE } from "../actions/action";
import { REMOVE_FROM_FAVOURITE , SET_SHOW_FAVOURITES} from "../actions/action";

const initialMoviesState = {
  list: [],
  favourites: [],
  showFavourites: false
}

export default function movies (state = initialMoviesState, action) {
  // if (action.type == ADD_MOVIES ) {
  //   return {
  //     ...initialMoviesState, list: action.movies
  //   }
  // }

  switch (action.type) {
    case ADD_MOVIES:
      return {...initialMoviesState, list:action.movies};
      
    case ADD_FAVOURITE:
      return {
        ...state,
        favourites: [action.movie, ...state.favourites]
      }
    
    case REMOVE_FROM_FAVOURITE:
      const filtedArray = state.favourites.filter (
        movie => movie.Title != action.movie.Title
      );
      return {
        ...state,
        favourites: filtedArray
      }

    case SET_SHOW_FAVOURITES:
      return {
        ...state,
        showFavourites: action.val
      } 

    default:
      return state;
  }
}
