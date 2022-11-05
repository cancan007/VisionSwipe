import { BigNumber, ethers } from "ethers";
import { loadMarket } from "../hooks/market/interactions";
import { loadNFT } from "../hooks/nft/interactions";
import { loadAccount, loadNetwork, loadProvider } from "../hooks/provider/interactions";
import { AppDispatch } from "../hooks/store";
import { useAppDispatch } from "../hooks/useGeneral";

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

export const loadBlockchainData = async (dispatch:AppDispatch) => {
  const provider = loadProvider(dispatch);
  const chainId = await loadNetwork(dispatch, provider);
  const nft = await loadNFT(dispatch, provider, chainId)
  const market = await loadMarket(dispatch, provider, chainId);
  loadAccount(dispatch,provider)
  window.ethereum.on('chainChanged', () => {
      window.location.reload();
  })
  window.ethereum.on('accountsChanged', () => {
      loadAccount(dispatch, provider);
  })
}