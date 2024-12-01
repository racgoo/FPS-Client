import { List, Button, Avatar, Typography } from "antd";
import { css } from "@emotion/react";
import { colors } from "@src/style/constants/colors";
import { WeaponInventoryProps } from "@src/types/weapon";

const WeaponInventory = ({
  inventory,
  equippedWeapon,
  onEquip,
}: WeaponInventoryProps) => {
  return (
    <List
      itemLayout="vertical"
      dataSource={inventory}
      renderItem={(item) => (
        <List.Item css={styles.inventoryItem}>
          <List.Item.Meta
            avatar={<Avatar size={64} shape="square" src={item.image} />}
            title={
              <Typography.Text style={{ color: colors.text.primary }}>
                {item.name}
              </Typography.Text>
            }
            description={
              <div css={styles.weaponInfo}>
                <Typography.Text type="secondary">{item.type}</Typography.Text>
                <Typography.Text type="warning">
                  Level: {item.level}
                </Typography.Text>
                <Typography.Text type="success">
                  Damage: {item.damage}
                </Typography.Text>
              </div>
            }
          />
          <Button
            type="primary"
            onClick={() => onEquip(item)}
            style={{ backgroundColor: colors.primary.main }}
          >
            {equippedWeapon?.id === item.id ? "Equipped" : "Equip"}
          </Button>
        </List.Item>
      )}
    />
  );
};

const styles = {
  inventoryItem: css({
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

export default WeaponInventory;
