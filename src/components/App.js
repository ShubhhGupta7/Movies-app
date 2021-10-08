import React from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies, setShowFavourites} from '../Actions'

class App extends React.Component {  
	
	componentDidMount() {
		// In real world senerio
		// make an api call
		// and dispatch action in store

		const {store} = this.props;

		// Subscribe method is basically a method which is called when ever any dispatch action changes our state and it takes a function as its argument,
		store.subscribe(() => {
			console.log('state updated!');
			this.forceUpdate();

			// Force update must be avoided for our easiness we have only used here.
		});

		store.dispatch(addMovies(data));
		// Here we are getting data from file or api call and we will be sending an action for an indent to change the state using dispatch.

		// Now as our state is changed but we are doing nothing to rerender our component. 

	}

	isMovieFavourite = (movie) => {
		const {movies} = this.props.store.getState();
		const index = movies.favourite.indexOf(movie);
		
		if(index !== -1) {
			// found the movie
			return true;
		}
		
		return false;
	}

	onChangeTab = (showFavourite) => {
		this.props.store.dispatch(setShowFavourites(showFavourite));
	}

	render() {
		console.log(this.props.store.getState());
		const {movies} = this.props.store.getState();
		const {list, favourite, showFavourite} = movies;
		const displayMovies = showFavourite ? favourite : list;
		return (
			<div className="App">
			  <Navbar />
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
						dispatch = {this.props.store.dispatch}
						isFavourite = {this.isMovieFavourite(movie)}	
					/>
					))}	  		
				  </div>
			  </div>
			</div>
		  );
	}
}

export default App;

