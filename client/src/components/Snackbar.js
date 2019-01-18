import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

const styles ={
  snackbar: { 
    width: 200,
    margin: 'auto' 
  },
  colors: {
    error: {
      color: 'red'
    },
    success: {
      color: 'green'
    }
  }
}

class AppSnackbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleClose() {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Snackbar
          style={styles.snackbar}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.open}
          autoHideDuration={1500}
          onClose={this.handleClose.bind(this)}
          message={(
            <div style={styles.colors[this.state.error ? 'error' : 'success']}>
              {this.state.message}
            </div>
          )}
        />
      </div>
    );
  }

  componentWillReceiveProps({ loading, error, message }) {
    !loading && this.setState({ 
      open: true,
      error: !!error,
      message
    });
  }
}

export default AppSnackbar;
