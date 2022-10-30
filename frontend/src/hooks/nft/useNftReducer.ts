import { AnyAction } from "redux";

interface nftType {
    contract?: Object;
}

export const nftReducer = (state:nftType = {}, action: AnyAction) => {
    switch(action.type) {
        case "NFT_LOADED":
            return {
                ...state,
                contract: action.contract,
            }
        default:
            return state;
    }
}  