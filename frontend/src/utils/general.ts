import { BigNumber, ethers } from "ethers";

export const parseEth = (amount: string):BigNumber => {
  const ethAmount = ethers.utils.parseEther(amount);
  return ethAmount;
}

export const formEth = (amount: BigNumber):string => {
    const formedAmount = ethers.utils.formatEther(amount);
    return formedAmount;
}