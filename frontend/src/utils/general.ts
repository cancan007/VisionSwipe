import { BigNumber, ethers } from "ethers";

export const parseEth = (amount: string):BigNumber => {
  const ethAmount = ethers.utils.parseEther(amount);
  return ethAmount;
}

export const formEth = (amount: BigNumber):string => {
    const formedAmount = ethers.utils.formatEther(amount);
    return formedAmount;
}

export const getJpyUsdValue = async(market:any) =>{
  const args = await market.getJpyUsdValue();
  //console.log(args);
  return args
}

export const getAvaxUsdValue = async(market:any) => {
  const args = await market.getAvaxUsdValue();
  //console.log(args);
  return args;
}

export const convertToAvax = async (market:any, priceUnit:BigNumber | string, price:BigNumber):Promise<BigNumber> => {
    const avax = await market.convertToAvax(priceUnit, price);
    //const res = formEth(avax);
    return avax;
}