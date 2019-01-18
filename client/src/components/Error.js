import React, { Component } from 'react';

class Error extends Component {
  render() {
    return (
      <div>
        {this.props.text}
      </div>
    );
  }
}

export default Error;
