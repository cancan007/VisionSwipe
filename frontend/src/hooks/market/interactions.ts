import { ethers} from "ethers";
import mapJson from "../../map.json"
import VSMarket from "../../artifacts/contracts/VSMarket.sol/VSMarket.json";
import { fetchItems } from "../api/nft-buildings/useFetchItems";
import { Action } from "@remix-run/router";
import { AppDispatch } from "../store";
import { fetchMyNFTs } from "../api/my-nfts/useFetchMyNFTs";

export const loadMarket = async (dispatch: any, provider: any, chainId: number) => {
    const chainKey = chainId.toString() as keyof typeof mapJson;
    const market = new ethers.Contract(mapJson[chainKey]["VSMarket"].slice(-1)[0], VSMarket.abi, provider);
    dispatch({ type: "MARKET_LOADED", contract: market });
    return market;
}

export const loadItems = async(dispatch:any, market:any, nft:any) => {
    const result = await fetchItems({market, nft});
    dispatch({type: "ITEMS_LOADED", items: result});
    return result;
}

export const loadMyItems = async(dispatch:AppDispatch, market:any, nft:any, provider:any) => {
    const myItems = await fetchMyNFTs({market, nft, provider});
    dispatch({type: 'MY_ITEMS_LOADED', myItems});
    return myItems;
}