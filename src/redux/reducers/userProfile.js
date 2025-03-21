
import { USER_PROFILE } from "../actions/ActionTypes";
import { IS_UNDEFINED } from "../../utils";

const initialState = {
  resetState: false,
  PROFILE : null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE:
      if (!IS_UNDEFINED(action.payload.resetState) && action.payload.resetState) {
        action.payload = {...initialState};
      }
      
      return Object.assign({}, state, action.payload);
    default: return state
  }
}
