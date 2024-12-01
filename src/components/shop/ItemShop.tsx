import { List, Button, notification, Avatar } from "antd";
import { css } from "@emotion/react";
import { colors } from "@src/style/constants/colors";
import { GameItem } from "@src/types/item";

interface ItemShopProps {
  items: GameItem[];
  gold: number;
  onPurchase: (item: GameItem) => void;
}

const ItemShop = ({ items, gold, onPurchase }: ItemShopProps) => {
  const handlePurchase = (item: GameItem) => {
    if (gold >= item.price) {
      onPurchase(item);
    } else {
      notification.error({
        message: "Insufficient Funds",
        description: "You do not have enough gold to purchase this item.",
      });
    }
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={items}
      renderItem={(item) => (
        <List.Item css={styles.shopItem}>
          <List.Item.Meta
            avatar={<Avatar size={64} shape="square" src={item.image} />}
            title={item.name}
            description={
              <div css={styles.itemInfo}>
                <div>Type: {item.type}</div>
                {item.damage && <div>Damage: {item.damage}</div>}
                {item.defense && <div>Defense: {item.defense}</div>}
                <div>Price: {item.price} gold</div>
              </div>
            }
          />
          <Button
            type="primary"
            onClick={() => handlePurchase(item)}
            style={{ backgroundColor: colors.primary.main }}
          >
            Purchase
          </Button>
        </List.Item>
      )}
    />
  );
};

const styles = {
  shopItem: css({
    backgroundColor: colors.background.medium,
    marginBottom: "8px",
    padding: "16px",
    borderRadius: "8px",
  }),
  itemInfo: css({
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  }),
};

export default ItemShop;
