import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  loaderWrap: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
}

class Loader extends Component {
  render() {
    return (
      (<div style={styles.loaderWrap}>
        <CircularProgress size={this.props.size}/>
      </div>)
    );
  }
}

export default Loader;
