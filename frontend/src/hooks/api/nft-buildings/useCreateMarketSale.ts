import { BigNumber } from "ethers";
import { useMutation, UseMutationOptions } from "react-query";
import { gasLimit } from "../../../utils/constants";
import { FetchItemResult } from "./useFetchItems";

export interface CreateMarketSaleProps{
  market: any;
  provider: any;
  item: FetchItemResult;
  value: BigNumber;
}

export const createMarketSale = async({market, provider, item, value}: CreateMarketSaleProps) => {
    const signer = await provider.getSigner();
    console.log(item)
    let tx = await market.connect(signer).createMarketSale(item.nftContract, item.itemId, { gasLimit,value});
    const event = await tx.wait();
    return event;
}

export const useCreateMarketSale = (
    mutationOptions?:UseMutationOptions<
    unknown,
    Error,
    CreateMarketSaleProps>) => {
        return useMutation<unknown, Error, CreateMarketSaleProps>(
            (obj) => createMarketSale(obj),
            mutationOptions
        )
    }