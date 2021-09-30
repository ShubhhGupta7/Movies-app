// Action types
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';

// Action creators 
export function addMovies(movies) {
    return {
        type: ADD_MOVIES,
        movies
    }
}

export function addFavouites(movies) {
    return {
        type: ADD_FAVOURITE,
        movies
    }
}

// Action type are used to define what type of action is it.
// Action creator creates action according to the action type.