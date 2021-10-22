import React from 'react';
import {data} from '../data';
import {connect} from '../index';
import {
    handleMovieSearch,
    addSearchResult,
    addSearchToList
} from '../Actions';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
    }

    handleAddToMovies = (movie) => {
        this.props.dispatch(addSearchToList(movie));
    }

    handleSearch = () => {
        const {searchText} = this.state; 
        // Here we can have the api call but ideally we should seperate our ul logic with our data fetching logic

        this.props.dispatch(handleMovieSearch(searchText));
    };

    handleChange = (event) => {
        this.setState({
            searchText: event.target.value
        })
    }

    render() {
        const {result: movie, showSearchResults} = this.props.search;
        return (
            <div className = "nav">
                <div className = "search-container"> 
                    <input onChange = {this.handleChange}/>
                    <button id = "search-btn"
                            onClick = {this.handleSearch}
                        >Search
                    </button>

                    {showSearchResults &&
                        <div className = 'search-results'>
                            <div className = 'search-result'> 
                                
                                <img src = {movie.Poster}
                                    alt = 'search-pic' />
                                <div className = 'movie-info'>
                                    <span>{movie.Title}</span>
                                    <button onClick = {(() => this.handleAddToMovies(movie))}>
                                        Add to Movies
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

// class NavbarWrapper extends React.Component {
// 	render() {
// 		return (
// 			<StoreContext.Consumer>
// 				{(store) => <Navbar dispatch = {store.dispatch}
//                                     search = {this.props.search} />}
// 			</StoreContext.Consumer>
// 		);
// 	}
// }

// export default NavbarWrapper;
function mapStateToPass({search}) {
    return {
        search
    };
}
export default connect(mapStateToPass)(Navbar);