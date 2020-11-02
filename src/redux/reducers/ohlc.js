import { FETCH_OHLC_DATA } from "../actionTypes";

const initialState = {
  ohlcData: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_OHLC_DATA: {
      const {  content } = action.payload;
      return {
        ...state,
        ohlcData: content,
      };
    }
  
    default:
      return state;
  }
}
