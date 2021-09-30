// Action types
export const ADD_MOVIES = 'ADD_MOVIES';

// Action creators 
export function addMovies(movies) {
    return {
        type: ADD_MOVIES,
        movies
    }
}

// Action type are used to define what type of action is it.
// Action creator creates action according to the action type.