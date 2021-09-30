export default function movies(state = [], action) {
    if(action.type === 'ADD_MOVIES')
        return action.state;

    return state;
}

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