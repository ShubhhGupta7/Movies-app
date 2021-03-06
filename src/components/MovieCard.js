import React from 'react';
import {addFavourites, removeFromFavourites} from '../Actions';

class MovieCard extends React.Component {

    handleFavoriteClick = () => {
        const {movie} = this.props;
        this.props.dispatch(addFavourites(movie))
    }

    handleUnfavouritesClick = () => {
        const {movie} = this.props;
        this.props.dispatch(removeFromFavourites(movie)); 
    }

    render() {
        const {movie, isFavourite} = this.props;

        return (
            <div className = "movie-card">
                <div className = 'left'>
                    <img alt = 'movie-poster'
                        src = {movie.Poster}
                    />
                </div>

                <div className = "right">
                    <div className ="title">{movie.Title}</div>
                    <div className ="plot">{movie.Plot}</div>
                    
                    <div className ="footer">
                        <div className ="rating">{movie.imdbRating}</div>
                        {
                        isFavourite ?  
                            <button className = 'unfavourite-btn'
                                    onClick = {this.handleUnfavouritesClick}>
                                        Unfavourite
                            </button> : 
                            <button className = 'favourite-btn'
                                    onClick = {this.handleFavoriteClick}>
                                        Favourite
                            </button>
                        }   
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default MovieCard;