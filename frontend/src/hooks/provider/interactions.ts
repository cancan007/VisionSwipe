import { ethers } from "ethers"; 

export const loadProvider = (dispatch: any) => {
    const connection = new ethers.providers.Web3Provider(window.ethereum);
    dispatch({ type: "PROVIDER_LOADED", connection });
    return connection;
}

export const loadNetwork = async (dispatch: any, provider: any) => {
    const { chainId } = await provider.getNetwork();
    dispatch({ type: "NETWORK_LOADED", chainId });
    return chainId;
}

export const loadAccount = async (dispatch: any, provider: any) => {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const account = ethers.utils.getAddress(accounts[0]);
    let auth:boolean;
    if(!process.env.REACT_APP_METAMASK_PUBLIC_ADDRESS || account !== process.env.REACT_APP_METAMASK_PUBLIC_ADDRESS){
        auth = false;
    }else if(account === process.env.REACT_APP_METAMASK_PUBLIC_ADDRESS){
        auth = true;
    }else {
        auth = false;
    }
    dispatch({ type: "ACCOUNT_LOADED", account , authentication: auth})

    let balance = await provider.getBalance(account);
    balance = ethers.utils.formatEther(balance);
    dispatch({ type: "BALANCE_LOADED", balance });
    return account;
}