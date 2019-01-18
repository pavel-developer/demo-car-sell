import { 
  CAR_SELL_LOADING,
  CAR_SELL_SUCCESS,
  CAR_SELL_FAILURE
} from '../action-types/carSell';

const initialState = {
  carSell: {},
  loading: false,
  error: null
};

const carSell = (state = initialState, { type, payload }) => {
  switch (type) {
    case CAR_SELL_LOADING: 
      return {
        ...state,
        loading: true
      };
    case CAR_SELL_SUCCESS: 
      return {
        ...state,
        loading: false,
        carSell: payload
      };
    case CAR_SELL_FAILURE: 
      return {
        ...state,
        loading: false,
        error: payload
      };
    default: 
      return state;
  }
};

export default carSell;
