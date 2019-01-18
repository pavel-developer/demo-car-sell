import { combineReducers } from 'redux';

import carSell from './carSell';
import email from './email';

export default combineReducers({
  carSell,
  email
});
