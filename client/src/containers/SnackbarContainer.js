import { connect } from 'react-redux';

import AppSnackbar from '../components/Snackbar';

const mapStateToProps = ({ email: { loading, error, message } }) => ({
  loading,
  error,
  message
});

export default connect(mapStateToProps)(AppSnackbar);
