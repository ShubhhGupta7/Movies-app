import { combineReducers } from 'redux';
import 
{
    ADD_MOVIES,
    ADD_TO_FAVOURITES,
    REMOVE_FROM_FAVOURITES, 
    SET_SHOW_FAVOURITES,
    ADD_SEARCH_RESULT,
    ADD_MOVIES_TO_LIST
}
from '../Actions';

// default movies state
const initialMoviesState = {
    list: [],
    favourite: [], 
    showFavourite: false
};

// obj2 = {...obj1, key:value ....}
// Above operator is known as (...) object spreading operator which copies all the data of prev object and if want to override some properties of that object we can do by seperating properties with commas.

export function movies(state = initialMoviesState, action) {
    // if(action.type === ADD_MOVIES)
    //     return {
    //         ...state,
    //         list: action.movies
    //     };

    // In react community we avoid if else conditionals instead we use switch cases.

    switch(action.type) {
        case ADD_MOVIES:
             return {
                ...state,
                list: action.movie
            }
        case ADD_TO_FAVOURITES: 
            return {
                ...state,
                favourite: [action.movie, ...state.favourite]
            }
        case REMOVE_FROM_FAVOURITES: 
            const filteredArray = state.favourite.filter(
                movie => movie.Title != action.movie.Title
            );
            return {
                ...state,
                favourite: filteredArray
            }
        case SET_SHOW_FAVOURITES: 
            return {
                ...state,
                showFavourite: action.showFavourite
            }
        case ADD_MOVIES_TO_LIST:
            return {
                ...state,
                list: [action.movie, ...state.list]
            }
        default:
            return state;
    }
}

const initialSearchState = {
    result: {}, 
    showSearchResults: false
};
export function search (state = initialSearchState, action) {
    switch(action.type) {
        case ADD_SEARCH_RESULT: 
            return {
                ...state,
                result: action.movie,
                showSearchResults: true
            }
        case ADD_MOVIES_TO_LIST:
            console.log(state)
             return {
                ...state,
                showSearchResults: false
            }
        default: 
            return state;
    }
}

const initialRootState = {
    search: initialSearchState,
    movies: initialMoviesState,
}
export default function rootReducer(state = initialRootState, action) {
    return {
        movies: movies(state.movies, action),
        search: search(state.search, action),

        // Here whenever state is changed both our reducers will be called as rootReducer will be called, it will internally call the all the reducer.
    }
}

// Here we don't have to create rootReducer function it is available in redux itself and it works simillarly as we discussed.
// export default combineReducers({
//     movies,
//     search
// });

// Above is the basic syntax of reducers in the react code.
// In reducers we get the current state of the component and our reducer creates an intent change to change the state. Along with current state we also get the action.
// In reducer function if the action of the reducer function does'nt match then we simply return the state.
// To make our app pridictable we will change our state in reducer function and they will we pure functions as well.
// Reducers always return the new state of the component they don't change the current state.

// What are pure functions?
// Pure function satisfies threee basic properties:
// 1) For same Input there should be same output always.
// 2) Pure function should never change or access anything out of it's scope.
// 3) Pure functions don't have any sideeffects that means, In pure function we should never call api calls or state change or dom change.

// Above we have written state = [] that means if our state array is undefined then initialize state array with [].
// This is a concept of default arguments in java script.

// Idealy we should avoid string comparisions and for that we store our actions in a form of variables and at the same time we store them in actions file as they are action types and impor them in reducers.

// Idealy we can only pass one reducer to the createStore function.
// To have multiple reducers we will create rootReducer and it will key-value pair of all reducers in it.

// In an file we can only have one default exports. 
