import React, { createContext } from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
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

  if(typeof action !== 'function') {
    console.log('ACTION_TYPE', action.type);
  }
  next(action);
}
// Here next will have reference to next middleware if present else redux will internally pass dispatch method reference.

// Creating a thunk middleware
// This function we get from redux-thunk 
// const thunk = ({dispatch, setState}) => 
//             (next) => (action) => {
//               if(typeof action === 'function') {
//                 action(dispatch);
//               }
              
//               next(action);
//             }


// using redux method to pass middleware to store
const store = createStore(rootReducer, applyMiddleware(logger, thunk));
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

// export const StoreContext = createContext();

// First way to use context
// The component rapped around the context and its child components will have access to store in this case.
// ReactDOM.render(
//   <React.StrictMode>
//     <StoreContext.Provider value = {store}>
//       <App store = {store} />
//     </StoreContext.Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// Second way to use context and we will be using this way as well.
// Creating class
// class Provider extends React.Component {
//   render() { 
//     return  <StoreContext.Provider value = {store}>
//               {this.props.children}
//               {/* Here Above statement will render all the components which are rapped inside the provider class. */}
//             </StoreContext.Provider>
//   }
// }

// Implementing connect funtion for 
// const connectedAppComponent = connect(callback)(App); 
// export function connect(callback) {
//   return function (Component) {
//     class ConnectedComponent extends React.Component {
//       constructor(props) {
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() => {
//           this.forceUpdate();
//         });
//       }

//       componentWillUnmount() {
//         this.unsubscribe();
//       }
//       render() {
//         const { store } = this.props;
//         const state = store.getState();
//         const dataToBeSentAsProps = callback(state);

//         return <Component dispatch={store.dispatch} {...dataToBeSentAsProps} />;
//       }
//     }

//     class ConnectedComponentWrapper extends React.Component {
//       render() {
//         return (
//           <StoreContext.Consumer>
//             {(store) => {
//               return <ConnectedComponent store={store} />;
//             }}
//           </StoreContext.Consumer>
//         );
//       }
//     }
//     return ConnectedComponentWrapper;
//   };
// }


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App/>
    </Provider>
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

// Context in redux 
// Previously we were passing our store as props to our components for accessing our store, but at higher level nesting we don't want to pass it like this.
// So we use react context so that we can access our store at any level of nesting without passing it in props.

// Context in redux basically have to major properties one is provider and second is the consumer.
// Provider provides the attribute or store at any level (or stores that in itself)
// With the help of consumer we can use store or attribute (basically gives access to the store or the attribute stored in the provider). 
// Inside the render only we can use consumer


// Context Component is used where we want Data provided in Provider
// Consumer expects a call back function.

// class className extends React.Component {
//   render() {

//     return (
//       <StoreContext.Consumer> 
//         {(properties saved in provider) => {
//           // JSX UI
//         }}
//       </StoreContext.Consumer>
//     );
//   }
// }

// Whenever value of provider get Changed then all the Consumers which is using that Store gets rerendered