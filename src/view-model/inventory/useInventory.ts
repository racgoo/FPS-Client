import { useCallback } from "react";
import { GameItem, ItemType } from "../../types/item";
import { dummyImage } from "@src/style/constants/dummy";

function useInventory() {
  const inventory: GameItem[] = Array.from({ length: 100 }, (_, i) => ({
    id: (i + 1).toString(),
    name: `아이템 ${i + 1}`,
    type: ItemType.WEAPON,
    level: Math.floor(Math.random() * 50) + 1,
    damage: Math.floor(Math.random() * 100) + 10,
    price: Math.floor(Math.random() * 5000) + 100,
    image: dummyImage,
  }));

  const equippedItem: GameItem = inventory[0];

  const equipItem = useCallback(
    (item: GameItem) => {
      console.log(`아이템 ${item.id} 장착됨`);
    },
    [inventory]
  );

  return {
    inventory,
    equippedItem,
    equipItem,
  };
}
export default useInventory;
