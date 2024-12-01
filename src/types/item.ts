export interface GameItem {
  id: string;
  name: string;
  type: ItemType;
  level: number;
  damage?: number; // 무기일 경우
  defense?: number; // 방어구일 경우
  healing?: number; // 회복 아이템일 경우
  price: number;
  image: string;
}

export enum ItemType {
  WEAPON = "WEAPON",
  ARMOR = "ARMOR",
  CONSUMABLE = "CONSUMABLE",
  MATERIAL = "MATERIAL",
}

export interface InventoryProps {
  inventory: GameItem[];
  equippedItems: Record<ItemType, GameItem | null>;
  onEquip: (item: GameItem) => void;
}

export interface ShopProps {
  items: GameItem[];
  gold: number;
  onPurchase: (item: GameItem) => void;
}
