import { ethers} from "ethers";
import mapJson from "../../map.json"
import VSMarket from "../../artifacts/contracts/VSMarket.sol/VSMarket.json";

export const loadMarket = async (dispatch: any, provider: any, chainId: number) => {
    const chainKey = chainId.toString() as keyof typeof mapJson;
    const market = new ethers.Contract(mapJson[chainKey]["VSMarket"].slice(-1)[0], VSMarket.abi, provider);
    dispatch({ type: "MARKET_LOADED", contract: market });
    return market;
}