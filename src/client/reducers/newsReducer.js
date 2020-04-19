import { FETCH_NEWS } from "../actions/index";

export default (state = [], action) =>  {
  switch (action.type) {
    case FETCH_NEWS:
      return action.payload.data
      break;
    default:
      return state 
  }
}