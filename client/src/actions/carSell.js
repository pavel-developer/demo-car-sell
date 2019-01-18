import { 
  CAR_SELL_LOADING,
  CAR_SELL_SUCCESS,
  CAR_SELL_FAILURE
} from '../action-types/carSell';

import { getCarSell, patchCarSell } from '../services/carSell';

const carSellLoading = () => ({
  type: CAR_SELL_LOADING
});

const carSellSuccess = (carSell) => ({
  type: CAR_SELL_SUCCESS,
  payload: carSell
});

const carSellFailure = (error) => ({
  type: CAR_SELL_FAILURE,
  payload: error
});

export const fetchCarSell = (id) => {
  return async (dispatch) => {
    try {
      dispatch(carSellLoading());
      const data = await getCarSell(id);
      dispatch(carSellSuccess(data));
    } catch (error) {
      dispatch(carSellFailure(error.response ? error.response.statusText : 'Something went wrong!'));
    }
  }
};

export const updateCarSell = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch(carSellLoading());
      const updatedData = await patchCarSell(id, data);
      dispatch(carSellSuccess(updatedData));
    } catch (error) {
      dispatch(carSellFailure(error.response ? error.response.statusText : 'Something went wrong!'));
    }
  }
};
