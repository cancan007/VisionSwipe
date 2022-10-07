//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol"; // to get current rate of currencies

contract BTTMarket is Ownable,ReentrancyGuard{
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemCancelled;
    Counters.Counter private _itemSold;

    address payable owner;
    //uint256 listingPrice = 0.025 ether;

    address avax_usd_priceFeed = 0x0A77230d17318075983913bC2145DB16C7366156;
    address jpy_usd_priceFeed = 0xf8B283aD4d969ECFD70005714DD5910160565b94;
    

   mapping(uint256=> address) basicPriceFeeds; // 0=>usd, 1=>yen

    constructor(){
        owner = payable(msg.sender);
        basicPriceFeeds[0] = avax_usd_priceFeed;
        basicPriceFeeds[1] = jpy_usd_priceFeed;
    }

    struct MarketItem{
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        uint256 priceUnit; // if 0, it means usd, if 1, it means yen
        uint256 feePercent;
        bool cancelled;
        bool sold;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        uint256 priceUnit,
        uint256 feePercent,
        bool cancelled,
        bool sold
    );

    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        uint256 priceUnit,
        uint256 feePercent
    )public onlyOwner nonReentrant{
        require(price > 0, "Price must be at least 1 wei");
        _itemIds.increment();
        uint256 itemId = _itemIds.current();
        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            priceUnit,
            feePercent,
            false,
            false
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            priceUnit,
            feePercent,
            false,
            false
        );
    }

    function createMarketSale(
        address nftContract, 
        uint256 itemId)
        public 
        payable
        nonRentrant{
            uint256 tokenId = idToMarketItem[itemId].tokenId;
            uint256 price = idToMarketItem[itemId].price;
            uint256 priceUnit = idToMarketItem[itemId].priceUnit;
            require(idToMarketItem[itemId].sold == false, "This item is already sold");
            require(idToMarketItem[itemId].cancelled == false, "This item is already cancelled");
            require(msg.value >= convertToAvax(priceUnit, price), "You need more Avax");
            uint256 feePercent = idToMarketItem[itemId].feePercent;
            uint256 fee = (msg.value*feePercent)/100;
            owner.transfer(fee);
            idToMarketItem[itemId].seller.transfer(msg.value - fee);
            IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
            idToMarketItem[itemId].owner = payable(msg.sender);
            idToMarketItem[itemId].sold = true;
            _itemSold.increment();
        }

    function cancelMarketItem(
        address nftContract,
        uint256 itemId) 
        public 
        onlyOwner 
        nonRentrant{
          idToMarketItem[itemId].cancelled = true;
          _itemCancelled.increment();
    }
        /// @notice Explain to an end user what this does
        /// @dev Explain to a developer any extra details
        /// @return Documents the return variables of a contract’s function state variable
        /// @inheritdoc	Copies all missing tags from the base function (must be followed by the contract name)

    function fetchMarketItems() public view returns(MarketItem[] memory){
        uint256 itemCount = _itemIds.current();
        uint256 unsoldItemCount = _itemIds.current() - _itemSold.curret() - _itemCancelled.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++){
            if(idToMarketItem[i+1].owner == address(0) && idToMarketItem[i+1].cancelled == false){
                uint256 currentId = idToMarketItem[i+1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyNFTs() public view returns(MarketItem[] memory){
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for(uint256 i=0; i < totalItemCount; i++){
            if(idToMarketItem[i+1].owner == msg.sender){
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for(uint256 i=0; i < totalItemCount; i++){
            if(idToMarketItem[i+1].owner == msg.sender){
                uint256 currentId = idToMarketItem[i+1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex+=1;
            }
        }
        return items;

    }


    function getAvaxUsdValue()
        public
        view
        returns (uint256, uint256)
    {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            basicPriceFeeds[0]
        );
        (, int256 price, , , ) = priceFeed.latestRoundData();
        uint256 decimals = uint256(priceFeed.decimals());
        return (uint256(price), decimals);
    }

    function getJpyUsdValue()
    public
        view
        returns (uint256, uint256)
    {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            basicPriceFeeds[1]
        );
        (, int256 price, , , ) = priceFeed.latestRoundData();
        uint256 decimals = uint256(priceFeed.decimals());
        return (uint256(price), decimals);
    }

    function convertUsdToAvax(uint256 _usdPrice)
       public
       view
       returns(uint256){
        (uint256 price, uint256 decimals) = getAvaxUsdValue();
        uint256 totalAvax = (_usdPrice*(10**decimals)/price);
        return totalAvax;
       }

    function convertYenToAvax(uint256 _jpyPrice)
        public
        view
        returns (uint256)
    {
        (uint256 price, uint256 decimals) = getJpyUsdValue();
        uint256 totalUsdPrice = (price * _jpyPrice) / (10**decimals); // total usd
        (price, decimals) = getAvaxUsdValue();
        uint256 totalAvax = (totalUsdPrice*(10**decimals)/price);
        return totalAvax;
    }

    function convertToAvax(uint256 _priceUnit, uint256 _price)
        public
        view 
        returns(uint256)
    {
        if(_priceUnit == 0){
            return convertUsdToAvax(_price);
        }else if(_priceUnit == 1){
            return convertYenToAvax(_jpyPrice);
        }
    }
}