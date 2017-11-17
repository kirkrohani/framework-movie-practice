import React from 'react';
import ReactDOM  from 'react-dom';
import MovieDetails from './MovieDetails.jsx'

class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayDetails: false
    }
  }

  displayMovieDetails() {
    this.setState({ displayDetails: true });
  }

  render() {
    const { movie } = this.props;

    return (
    <div>
        <div className="box" >
        <span onClick={this.displayMovieDetails.bind(this)}>{movie.title}</span>
        { this.state.displayDetails && <MovieDetails movie={movie} /> }
        <button id="toggleButton" onClick={() => {this.props.handleToggle(movie) } }>{movie.watched ? 'Seen' : 'Unseen'}</button>        
        </div>
    </div>)
  }
}
    
export default Movie;