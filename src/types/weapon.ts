export interface Weapon {
  id: string;
  name: string;
  type: string;
  level: number;
  damage: number;
  price: number;
  image: string;
}

export interface WeaponInventoryProps {
  inventory: Weapon[];
  equippedWeapon: Weapon | null;
  onEquip: (weapon: Weapon) => void;
}

export interface WeaponShopProps {
  weapons: Weapon[];
  gold: number;
  onPurchase: (weapon: Weapon) => void;
}
