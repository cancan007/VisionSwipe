import axios from "axios";
import { BigNumber, ethers } from "ethers";
import { useQuery } from "react-query";
import { nftType } from "../../../pages/Admin";

interface FetchItemsProps {
    provider: any;
    market: any;
    nft: any;
}

export interface Item {
    itemId: BigNumber;
    nftContract: string;
    tokenId: BigNumber;
    seller: string;
    owner: string;
    price: BigNumber;
    priceUnit: BigNumber; 
    feePercent: BigNumber;
    cancelled: BigNumber;
    sold: boolean;
}

export type FetchItemResult = Item & Omit<nftType, 'price' | 'priceUnit' | 'feePercent'>

export const fetchItems = async({ provider,market, nft}: FetchItemsProps): Promise<FetchItemResult[]>=> {
    const items = await market.connect(provider).fetchMarketItems();
    
    const result:FetchItemResult[] = await Promise.all(items.map(async(item:Item,i:number) => {
        const {itemId, nftContract, tokenId, seller, owner, cancelled, sold} = item;
        const tokenURI = await nft.tokenURI(item.tokenId);
        const meta = await axios.get(tokenURI);
        //const {price, priceUnit, feePercent, ...args} = meta.data;
        return {itemId, nftContract, tokenId, seller, owner, cancelled, sold, ...meta.data};
    }))
    return result;
};


export const useFetchItems = (obj:FetchItemsProps) => {
    return useQuery<Array<FetchItemResult>, Error>(
        'fetchItems',
        () => fetchItems(obj)
    )
}