import { 
  SEND_LOADING,
  SEND_SUCCESS,
  SEND_FAILURE
} from '../action-types/email';

const initialState = {
  loading: false,
  message: '',
  error: null
};

const email = (state = initialState, { type, payload }) => {
  switch (type) {
    case SEND_LOADING: 
      return {
        ...state,
        loading: true
      };
    case SEND_SUCCESS: 
      return {
        ...state,
        loading: false,
        message: payload
      };
    case SEND_FAILURE: 
      return {
        ...state,
        loading: false,
        error: true,
        message: payload
      };
    default: 
      return state;
  }
};

export default email;
