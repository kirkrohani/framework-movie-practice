import React from 'react';
import ReactDOM  from 'react-dom';

class AddMovie extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <input type="text" size='70' placeholder="Add movie title here" ref={input => this._newMovieTitle = input} />
      <button onClick={ () => {this.props.addMovieFunction(this._newMovieTitle.value);} }>ADD</button>
    </div>)
  }
}

export default AddMovie;

