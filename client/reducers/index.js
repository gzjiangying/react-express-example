import {
  combineReducers
} from 'redux';

import {
  ACCOUNT_UPDATE,
  ACCOUNT_RESET,
  COMPLAIN_SHOW
} from '../actions/index';

const account_init_state = {
  login_name: 'guest',
  role: 'guest', // or admin
  id: 0 // or logged_in, logging_in
};

const account = function(state = account_init_state, action) {
  if (action.type === ACCOUNT_UPDATE) {
    return {
      ...state,
      ...action.payload
    };
  } else if (action.type === ACCOUNT_RESET) {
    return {
      ...account_init_state
    }
  }

  return state;
};
const complain_init_state = {
  id: -1
};
const complain = function(state = complain_init_state, action) {
  if (action.type === COMPLAIN_SHOW) {
    return {
      ...state,
      ...action.payload
    };
  }
  return state;
};

export default combineReducers({
  account,
  complain
});