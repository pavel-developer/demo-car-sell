import { connect } from 'react-redux';

import CarSell from '../components/CarSell';
import { fetchCarSell, updateCarSell } from '../actions/carSell';
import { sendEmailToSeller } from '../actions/email';

const mapStateToProps = ({ carSell: { loading, error, carSell }, email: { loading: emailSending } }) => ({
  carSell,
  loading,
  error,
  emailSending
});

const mapDispatchToProps = (dispatch) => ({
  fetchCarSell: (id) => dispatch(fetchCarSell(id)),
  updateCarSell: (id, data) => dispatch(updateCarSell(id, data)),
  sendEmail: (data) => dispatch(sendEmailToSeller(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarSell);
