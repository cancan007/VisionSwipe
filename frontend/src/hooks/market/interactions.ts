import { BigNumber, ethers } from "ethers";
import mapJson from "../../map.json";
import VSMarket from "../../artifacts/contracts/VSMarket.sol/VSMarket.json";
import {
  FetchItemResult,
  fetchItems,
} from "../api/nft-buildings/useFetchItems";
import { Action } from "@remix-run/router";
import { AppDispatch } from "../store";
import { fetchMyNFTs } from "../api/my-nfts/useFetchMyNFTs";
import axios from "axios";

export const loadMarket = async (
  dispatch: any,
  provider: any,
  chainId: number
) => {
  const chainKey = chainId.toString() as keyof typeof mapJson;
  const market = new ethers.Contract(
    mapJson[chainKey]["VSMarket"].slice(-1)[0],
    VSMarket.abi,
    provider
  );
  dispatch({ type: "MARKET_LOADED", contract: market });
  return market;
};

export const loadItems = async (dispatch: any, market: any, nft: any) => {
  const result = await fetchItems({ market, nft });
  dispatch({ type: "ITEMS_LOADED", items: result });
  return result;
};

export const loadMyItems = async (
  dispatch: AppDispatch,
  market: any,
  nft: any,
  provider: any
) => {
  const myItems = await fetchMyNFTs({ market, nft, provider });
  dispatch({ type: "MY_ITEMS_LOADED", myItems });
  return myItems;
};

// to listen and notify the events from blockchain
export const subscribeToEvents = (dispatch: AppDispatch, market: any) => {
  market.on(
    "MarketItemSold",
    (
      itemId: BigNumber,
      nftContract: string,
      tokenId: BigNumber,
      seller: string,
      owner: string,
      price: BigNumber,
      priceUnit: BigNumber,
      feePercent: BigNumber,
      cancelled: boolean,
      sold: boolean,
      txTime: BigNumber,
      event: any
    ) => {
      const order = event.args;
      dispatch({ type: "UPDATED_SOLDITEM", order, event });
    }
  );

  market.on(
    "MarketItemCancelled",
    (
      itemId: BigNumber,
      nftContract: string,
      tokenId: BigNumber,
      seller: string,
      owner: string,
      price: BigNumber,
      priceUnit: BigNumber,
      feePercent: BigNumber,
      cancelled: boolean,
      sold: boolean,
      txTime: BigNumber,
      event: any
    ) => {
      const order = event.args;
      dispatch({ type: "UPDATED_CANCELLEDITEM", order, event });
    }
  );
};

export const loadAllTx = async (
  dispatch: AppDispatch,
  market: any,
  nft: any,
  provider: any
) => {
  const block = await provider.getBlockNumber();
  const soldFilter = market.filters.MarketItemSold();
  const soldStream = await market.queryFilter(soldFilter, 0, block);
  const soldOrders = soldStream.map((event: any) => event.args);
  const result: FetchItemResult[] = await Promise.all(
    soldOrders.map(async (item: Item, i: number) => {
      const tokenURI = await nft.tokenURI(item.tokenId);
      let meta = await axios.get(tokenURI);
      const { price, priceUnit, feePercent, ...args } = meta.data;
      return { ...item, ...args };
    })
  );
  dispatch({ type: "SOLD_ITEMS_LOADED", soldItems: result });

  const cancelledFilter = market.filters.MarketItemCancelled();
  const cancelledStream = await market.queryFilter(cancelledFilter, 0, block);
  const cancelledOrders = cancelledStream.map((event: any) => event.args);
  const result2: FetchItemResult[] = await Promise.all(
    cancelledOrders.map(async (item: Item, i: number) => {
      const tokenURI = await nft.tokenURI(item.tokenId);
      let meta = await axios.get(tokenURI);
      const { price, priceUnit, feePercent, ...args } = meta.data;
      return { ...item, ...args };
    })
  );
  dispatch({ type: "CANCELLED_ITEMS_LOADED", cancelledItems: result2 });
};
