import React from 'react';
import ReactDOM  from 'react-dom';

const MovieDetails = (props) => {
  const { movie } = props;

  return (
    <div>
      Year: {movie.release_date} <br />
      Score: {movie.vote_average} <br />
      Total Votes: {movie.vote_count} <br />
    </div>
  )
}
    
export default MovieDetails;