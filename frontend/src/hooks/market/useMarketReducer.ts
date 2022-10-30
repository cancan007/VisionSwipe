import { AnyAction } from "redux";

interface marketType {
    contract?: Object;
}
export const marketReducer = (state:marketType = {}, action: AnyAction) => {
    switch(action.type) {
        case "MARKET_LOADED":
            return {
                ...state,
                contract: action.contract,
            }
        default:
            return state;
    }
}