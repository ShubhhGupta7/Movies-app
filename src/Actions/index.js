// Action types
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES';
export const SET_SHOW_FAVOURITES = 'SET_SHOW_FAVOURITES';

// Action creators 
export function addMovies(movie) {
    return {
        type: ADD_MOVIES,
        movie
    }
}

export function addFavourites(movie) {
    return {
        type: ADD_TO_FAVOURITES,
        movie
    }
}

export function removeFromFavourites(movie) {
    return {
        type: REMOVE_FROM_FAVOURITES,
        movie
    }
}

export function setShowFavourites(showFavourite) {
    return {
        type: SET_SHOW_FAVOURITES,
        showFavourite
    }
}

// Action type are used to define what type of action is it.
// Action creator creates action according to the action type.