import { BigNumber } from "ethers";
import { useMutation, UseMutationOptions } from "react-query";

interface CancelMarketItemProps {
  provider: any;
  market: any;
  itemId: BigNumber;
}

export const cancelMarketItem = async ({
  provider,
  market,
  itemId,
}: CancelMarketItemProps) => {
  const signer = await provider.getSigner();
  let tx = await market.connect(signer).cancelMarketItem(itemId);
  const event = await tx.wait();
  return event;
};

export const useCancelMarketItem = (
  mutateOptions?: UseMutationOptions<unknown, Error, CancelMarketItemProps>
) => {
  return useMutation<unknown, Error, CancelMarketItemProps>(
    (obj) => cancelMarketItem(obj),
    mutateOptions
  );
};
