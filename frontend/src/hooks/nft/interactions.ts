import { ethers} from "ethers";
import mapJson from "../../map.json"
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";

export const loadNFT = async (dispatch: any, provider: any, chainId: number) => {
    const chainKey = chainId.toString() as keyof typeof mapJson;
    const nft = new ethers.Contract(mapJson[chainKey]["NFT"].slice(-1)[0], NFT.abi, provider);
    dispatch({ type: "NFT_LOADED", contract: nft });
    return nft;
}