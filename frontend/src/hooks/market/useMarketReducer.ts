import { AnyAction } from "redux";
import { FetchItemResult } from "../api/nft-buildings/useFetchItems";

interface marketType {
    contract?: Object;
    items?: FetchItemResult[];
    myItems?: FetchItemResult[];
};
export const marketReducer = (state:marketType = {}, action: AnyAction) => {
    switch(action.type) {
        case "MARKET_LOADED":
            return {
                ...state,
                contract: action.contract,
            }
        case "ITEMS_LOADED":
            return{
                ...state,
                items: action.items,
            }
        case "MY_ITEMS_LOADED":
            return{
                ...state,
                myItems: action.myItems,
            }
        default:
            return state;
    }
}