import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';

import './index.css';
import App from './components/App';
import rootReducer from './Reducers';

// Adding middleware. / Ideally we should not console log in reducers and actions file instead we should be using middleware for that.
// middleware are called in between action dispatch to reducer.

// Using Curring for middleware.
// Here middleware takes an object as an argument.

// Internally redux calls middleware 
// logger(object)(next)(action)

// logger(object, next, action)
const loggerType1 = function({dispatch, getState}) {
  return function(next) {
    return function(action) {
      // logger code /middleware
      console.log('ACTION NAME:', action.type);
      next(action);
    }
  }
}

// Type 2 for defining a middleware
const logger = ({dispatch, setState}) => (next) => (action) => {
  // logger / middleware code
  console.log('ACTION_TYPE', action.type);
  next(action);
}
// Here next will have reference to next middleware if present else redux will internally pass dispatch method reference.

// using redux method to pass middleware to store
const store = createStore(rootReducer, applyMiddleware(logger));
// console.log('before state', store.getState());
// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies: [
//     {
//       name: 'Superman'
//     }
//   ]
// })
// console.log('after state', store.getState());


ReactDOM.render(
  <React.StrictMode>
    <App store = {store} />
  </React.StrictMode>,
  document.getElementById('root')
);


// Concept of curring: When a function expects a list of argument and we call it will the subset of that list then function returns a function which is waiting for the remaining arguments.
// Example:
// function getCurryFunction(f) {
//     return function(a) {
//         return function(b) {
//             return function(c) {
//                 return f(a, b, c);
//             }
//         }
//     }
// }
// function sum(a, b, c) {
//     return a + b + c;
// }
// var curriedSum = getCurryFunction(sum);
// console.log(curriedSum(1)(2)(3));

// Arrow functions
// const arrowFunction = () => {return 1};

// Here in above function call there is only one statement so instead of writing return inside curly brases, we can directly write what we have to written.
// This is known as implicit return.

// const arrorFunction = () => 1;