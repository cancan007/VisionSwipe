interface Item {
    itemId: BigNumber;
    nftContract: string;
    tokenId: BigNumber;
    seller: string;
    owner: string;
    price: BigNumber;
    priceUnit: BigNumber; 
    feePercent: BigNumber;
    cancelled: BigNumber;
    sold: boolean;
}

interface nftType {
    name: string;
    buildingType: string;
    saleType: string;
    description: string;
    priceUnit: string;
    price: string;
    feePercent: string;
    address: string;
    image?:string;
    images?: string[];
    company?: string,
    companyEmail?: string,
  }