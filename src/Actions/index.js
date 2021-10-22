import { movies } from "../Reducers";

// Action types
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES';
export const SET_SHOW_FAVOURITES = 'SET_SHOW_FAVOURITES';
export const ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT';
export const ADD_MOVIES_TO_LIST = 'ADD_MOVIES_TO_LIST';

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

export function addSearchResult(movie) {
    return {
        type: ADD_SEARCH_RESULT,
        movie
    };
}

export function addSearchToList(movie) {
    return {
        type: ADD_MOVIES_TO_LIST,
        movie
    }
}

export function handleMovieSearch(movie) {
    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=7e4d550&t=${movie}`;
    console.log("movie Searched:", movie);
    return function (dispatch) {
        // Here fetch function is a async function so our app will break if we do it like this.
        // Here we got the response object but ideally we should get json so converting.

        fetch(url)
        .then(response => response.json())
        .then(movie => {
            console.log('movie', movie); // Ideally we should not console.log

            // In handle movie search we have to do two tasks.
            // First fetch the movies from the api.
            // And then add the movie to the store.

            // To add movie to store
            // dispatch an action 
            dispatch(addSearchResult(movie));
        })
    }
}

// Thunk are the special kind of function return by a function 
// So here we will be using a thunk middleware so that we can return function by action instead of a action object

// Action type are used to define what type of action is it.
// Action creator creates action according to the action type.