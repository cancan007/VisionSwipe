import axios from "axios";
import { BigNumber, ethers } from "ethers";
import { useQuery } from "react-query";

interface FetchItemsProps {
    market: any;
    nft: any;
}


export type FetchItemResult = Item & Omit<nftType, 'price' | 'priceUnit' | 'feePercent'>

export const fetchItems = async({ market, nft}: FetchItemsProps): Promise<FetchItemResult[]>=> {
    const items = await market.fetchMarketItems();
    
    const result:FetchItemResult[] = await Promise.all(items.map(async(item:Item,i:number) => {
        //const {itemId, nftContract, tokenId, seller, owner, cancelled, sold} = item;
        const tokenURI = await nft.tokenURI(item.tokenId);
        const meta = await axios.get(tokenURI);
        const {price, priceUnit, feePercent, ...args} = meta.data;
        //return {itemId, nftContract, tokenId, seller, owner, cancelled, sold, ...meta.data};
        return {...item, ...args};
    }))
    return result;
};


export const useFetchItems = (obj:FetchItemsProps) => {
    return useQuery<Array<FetchItemResult>, Error>(
        'fetchItems',
        () => fetchItems(obj)
    )
}