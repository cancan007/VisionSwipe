import { BigNumber } from "ethers";
import { useMutation, UseMutationOptions } from "react-query";
import { gasLimit } from "../../../utils/admin/constants";


interface CreateNftProps {
    provider: any;
    nft: any;
    tokenURI: string;
}

export const createNft = async({provider, nft, tokenURI}: CreateNftProps) => {
    const signer = await provider.getSigner();
    let tx = await nft.connect(signer).createToken(tokenURI, {gasLimit});
    let event = await tx.wait();
    return event.events[0].args.tokenId;
}

export const useCreateNFT = (
    mutationOptons?:UseMutationOptions<
    unknown,
    Error,
    CreateNftProps
    >
) => {
    return useMutation<unknown, Error, CreateNftProps>(
        (obj) => createNft(obj),
        mutationOptons
    )
}