import { Box, Image, Text, useDisclosure } from "@chakra-ui/react";
import { FetchItemResult } from "../hooks/api/nft-buildings/useFetchItems";
import { useAppSelector } from "../hooks/useGeneral";
import { formEth } from "../utils/general";
import { ItemDetailModal } from "./my-nfts/ItemDetailModal";

interface GridItemsTableProps {
  items: FetchItemResult[];
  admin?: boolean;
  cancel?: any;
  /*isOpen: any;
  onOpen: () => void;
  onClose: () => void;*/
}

export const GridItemsTable: React.FC<GridItemsTableProps> = ({
  items,
  admin,
  cancel,
  /*isOpen,
  onOpen,
  onClose,*/
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box className="w-3/5 min-w-[768px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-2">
      {items ? (
        items.map((item, i: number) => (
          <Box
            onClick={onOpen}
            className="rounded-lg border-2 flex flex-col items-center cursor-pointer"
          >
            {item.image && !item.images ? (
              <Image
                src={item.image}
                className="object-cover rounded-t-lg aspect-[4/3]"
              />
            ) : !item.image && item.images ? (
              <Image
                src={item.images[0]}
                className="object-cover rounded-t-lg aspect-[4/3]"
              />
            ) : (
              <></>
            )}
            <Box className="flex flex-col items-start justify-center">
              <Text className="text-xl font-semibold">{item.name}</Text>
              <Text className="text-sm">
                Bought price: {formEth(item.price)}
                {Number(formEth(item.priceUnit)) === 0 ? "$" : "Yen"}
              </Text>
            </Box>
            <ItemDetailModal
              isOpen={isOpen}
              onClose={onClose}
              item={item}
              admin={admin}
              cancel={cancel && (() => cancel(item.itemId))}
            />
          </Box>
        ))
      ) : (
        <></>
      )}
    </Box>
  );
};
