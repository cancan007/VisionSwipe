import { BigNumber } from "ethers";
import { formEth, parseEth } from "../general";

export const addCommissionToPrice = (avaxPrice:BigNumber, commission:number) => {
    const formedAvax = formEth(avaxPrice);
    const formedTotal = Number(formedAvax) + commission;
    const total = parseEth(formedTotal.toString());
    return total;
}