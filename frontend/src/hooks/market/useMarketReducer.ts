import { AnyAction } from "redux";
import { FetchItemResult } from "../api/nft-buildings/useFetchItems";

interface marketType {
  contract?: Object;
  items?: FetchItemResult[];
  myItems?: FetchItemResult[];
  soldItems?: FetchItemResult[];
  cancelledItems?: FetchItemResult[];
}
export const marketReducer = (state: marketType = {}, action: AnyAction) => {
  switch (action.type) {
    case "MARKET_LOADED":
      return {
        ...state,
        contract: action.contract,
      };
    case "ITEMS_LOADED":
      return {
        ...state,
        items: action.items,
      };
    case "MY_ITEMS_LOADED":
      return {
        ...state,
        myItems: action.myItems,
      };
    case "SOLD_ITEMS_LOADED":
      return {
        ...state,
        soldItems: action.soldItems,
      };
    case "UPDATED_SOLDITEM":
      return {
        ...state,
        soldItems: state.soldItems?.length
          ? [...state.soldItems, action.order]
          : [action.order],
      };
    case "CANCELLED_ITEMS_LOADED":
      return {
        ...state,
        cancelledItems: action.cancelledItems,
      };
    case "UPDATED_CANCELLEDITEM":
      return {
        ...state,
        cancelledItems: state.cancelledItems?.length
          ? [...state.cancelledItems, action.order]
          : [action.order],
      };
    default:
      return state;
  }
};
