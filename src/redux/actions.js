import { FETCH_OHLC_DATA } from "./actionTypes";

export const storeOhlcData = content => ({
    type: FETCH_OHLC_DATA,
    payload: {
        content
    }
});

