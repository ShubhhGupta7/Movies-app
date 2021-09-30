import React from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies} from '../Actions'

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

	render() {
		const {store} = this.props;
		const movies = store.getState();

		console.log(movies, "movies array");
		return (
			<div className="App">
			  <Navbar />
			  <div className = "main">
		
				  <div className ="tabs">
					  <div className ="tab">Movies</div>
					  <div className ="tab">Favourites</div>
				  </div>
		
				  <div className ="list">	
					{movies.map((movie, index) => (
						<MovieCard movie = {movie} key = {`movies-${index}`} />
					))}	  		
				  </div>
			  </div>
			</div>
		  );
	}
}

export default App;
