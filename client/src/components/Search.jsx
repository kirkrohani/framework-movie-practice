import React from 'react';
import ReactDOM  from 'react-dom';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <input type="text" placeholder="Search..." ref={input => this._movieName = input} />
      <button onClick={ () => {this.props.searchFunction(this._movieName.value);} }>Go!</button>
    </div>)
  }
}

export default Search;

