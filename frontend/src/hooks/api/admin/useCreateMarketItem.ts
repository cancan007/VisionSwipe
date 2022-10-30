
import { BigNumber } from "ethers";
import { useMutation, UseMutationOptions } from "react-query";
import { gasLimit } from "../../../utils/admin/constants";
import { parseEth } from "../../../utils/general";

interface CreateMarketItemProps {
    provider: any;
    market: any;
    nft: any;
    tokenId: BigNumber | any;
    price: string;
    priceUnit:string;
    feePercent:string;
}

export const createMarketItem = async({provider, market, nft, tokenId, price, priceUnit, feePercent}: CreateMarketItemProps) => {
  const signer = await provider.getSigner();
  let priceEth = parseEth(price);
  let priceUnitEth = parseEth(priceUnit);
  let feePercentEth = parseEth(feePercent);
  let tx = await market.connect(signer).createMarketItem(nft.address, tokenId, priceEth, priceUnitEth, feePercentEth, {gasLimit});
  let event = await tx.wait();
  return event;
}

export const useCreateMarketItem = (
    mutationOptions?:UseMutationOptions<
    unknown,
    Error,
    CreateMarketItemProps>) => {
        return useMutation<unknown, Error, CreateMarketItemProps>(
            (obj) => createMarketItem(obj),
            mutationOptions
        )
    }
