import React from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies, setShowFavourites} from '../Actions';
// import {connect} from '../index';
import {connect} from 'react-redux';

class App extends React.Component {  
	
	componentDidMount() {
		// In real world senerio
		// make an api call
		// and dispatch action in store

		// const {store} = this.props;

		// Subscribe method is basically a method which is called when ever any dispatch action changes our state and it takes a function as its argument,
		// store.subscribe(() => {
		// 	console.log('state updated!');
		// 	this.forceUpdate();

			// Force update must be avoided for our easiness we have only used here.
		// });

		// store.dispatch(addMovies(data));
		this.props.dispatch(addMovies(data));
		
		// Here we are getting data from file or api call and we will be sending an action for an indent to change the state using dispatch.

		// Now as our state is changed but we are doing nothing to rerender our component. 

	}

	isMovieFavourite = (movie) => {
		const {movies} = this.props;
		// const {movies} = this.props.store.getState();
		const index = movies.favourite.indexOf(movie);
		
		if(index !== -1) {
			// found the movie
			return true;
		}
		
		return false;
	}

	onChangeTab = (showFavourite) => {
		// this.props.store.dispatch(setShowFavourites(showFavourite));
		this.props.dispatch(setShowFavourites(showFavourite));
	}

	render() {
		// const {movies, search} = this.props.store.getState();
		const {movies, search} = this.props;
		const {list, favourite, showFavourite} = movies;
		const displayMovies = showFavourite ? favourite : list;
		return (
			<div className="App">
			  <Navbar 
				search = {search}
			  />
			  <div className = "main">
		
				  <div className ="tabs">
					  <div 
					  		className = {`tab ${showFavourite ? '': 'active-tabs'}`}
					  		onClick = {() => this.onChangeTab(false)}
					  >Movies</div>
					  <div 
					  		className = {`tab ${showFavourite ? 'active-tabs': ''}`}
					  		onClick = {() => this.onChangeTab(true)}	
					  >Favourites</div>
				  </div>
		
				  <div className ="list">	
					{displayMovies.map((movie, index) => (
						<MovieCard 
						movie = {movie} 
						key = {`movies-${index}`}
						dispatch = {this.props.dispatch}
						isFavourite = {this.isMovieFavourite(movie)}	
					/>
					))}	  		
				  </div>
			  </div>
			</div>
		  );
	}
}

// class AppWrapper extends React.Component {
// 	render() {
// 		return (
// 			<StoreContext.Consumer>
// 				{(store) => <App store = {store} />}
// 			</StoreContext.Consumer>
// 		);
// 	}
// }

// export default AppWrapper; Instead we are using connect function

// Above we can wrap the ui by a Consumer but as we using Store outside the ui in other methods and componentDidMount and we know that we can use consumer inside a render function only 

// So now we are wraping whole component inside Consumer (AppWrapper).


/*
In callback function we are assuming that we will have store as the argument and we will get the required properties 
Connect function will take an component and gives another component
Connect function will defaulty pass dispatch to the component
*/ 
function mapStateToProps(state) {
	return {
		movies: state.movies,
		search: state.search
	}
}

const connectedComponent = connect(mapStateToProps)(App);
export default connectedComponent;