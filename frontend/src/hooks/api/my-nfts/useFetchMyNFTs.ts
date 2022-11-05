import axios from "axios";
import { useQuery } from "react-query";

interface FetchMyNFTsProps{
    market:any;
    nft:any;
    provider:any;
}

export type FetchMyNFTsResult = Item & Omit<nftType, 'price' | 'priceUnit' | 'feePercent'>

export const fetchMyNFTs = async({market, nft, provider}: FetchMyNFTsProps) => {
    const signer = await provider.getSigner();
    const items = await market.connect(signer).fetchMyNFTs();
    const result:FetchMyNFTsResult[] = await Promise.all(items.map(async(item:Item,i:number) => {
        const {itemId, nftContract, tokenId, seller, owner, cancelled, sold} = item;
        const tokenURI = await nft.tokenURI(item.tokenId);
        const meta = await axios.get(tokenURI);
        const {price, priceUnit, feePercent, ...args} = meta.data;
        return {itemId, nftContract, tokenId, seller, owner, cancelled, sold, ...meta.data};
        //return {...item, ...args};
    }))
    return result
}

export const useFetchMyNFTs = (obj: FetchMyNFTsProps) => {
    return useQuery<Array<FetchMyNFTsResult>, Error>(
        'fetchItems',
        () => fetchMyNFTs(obj)
    )
}