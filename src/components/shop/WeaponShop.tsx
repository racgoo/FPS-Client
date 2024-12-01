import { List, Button, notification, Avatar } from "antd";
import { css } from "@emotion/react";
import { colors } from "@src/style/constants/colors";
import { WeaponShopProps } from "@src/types/weapon";

const WeaponShop = ({ weapons, gold, onPurchase }: WeaponShopProps) => {
  const handlePurchase = (weapon: Weapon) => {
    if (gold >= weapon.price) {
      onPurchase(weapon);
    } else {
      notification.error({
        message: "Insufficient Funds",
        description: "You do not have enough gold to purchase this weapon.",
      });
    }
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={weapons}
      renderItem={(item) => (
        <List.Item css={styles.shopItem}>
          <List.Item.Meta
            avatar={<Avatar size={64} shape="square" src={item.image} />}
            title={item.name}
            description={
              <div css={styles.weaponInfo}>
                <div>Type: {item.type}</div>
                <div>Damage: {item.damage}</div>
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
  weaponInfo: css({
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  }),
};

export default WeaponShop;
