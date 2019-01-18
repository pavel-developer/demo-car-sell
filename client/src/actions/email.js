import { 
  SEND_LOADING,
  SEND_SUCCESS,
  SEND_FAILURE
} from '../action-types/email';

import { sendEmail } from '../services/email';

const sendLoading = () => ({
  type: SEND_LOADING
});

const sendSuccess = (message) => ({
  type: SEND_SUCCESS,
  payload: message
});

const sendFailure = (error) => ({
  type: SEND_FAILURE,
  payload: error
});

export const sendEmailToSeller = (data) => {
  return async (dispatch) => {
    try {
      dispatch(sendLoading());
      await sendEmail(data);
      dispatch(sendSuccess('Email sended!'));
    } catch (error) {
      dispatch(sendFailure(error.response ? error.response.statusText : 'Something went wrong!'));
    }
  }
};
