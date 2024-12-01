import { Button, Avatar, Typography, Tooltip } from "antd";
import { css } from "@emotion/react";
import { colors } from "@src/style/constants/colors";
import { GameItem } from "@src/types/item";

interface GameInventoryProps {
  inventory: GameItem[];
  equippedItem: GameItem | null;
  onEquip: (item: GameItem) => void;
}

const GameInventory = ({
  inventory,
  equippedItem,
  onEquip,
}: GameInventoryProps) => {
  return (
    <div css={styles.container}>
      <div css={styles.gridContainer}>
        {inventory.map((item) => (
          <Tooltip
            key={item.id}
            title={renderItemDetails(item)}
            placement="bottom"
          >
            <div css={styles.gridItem}>
              <Avatar
                size={64}
                shape="square"
                src={item.image}
                css={styles.itemImage}
              />
              <Button
                type="primary"
                size="small"
                onClick={() => onEquip(item)}
                style={{
                  backgroundColor:
                    equippedItem?.id === item.id
                      ? colors.primary.dark
                      : colors.primary.main,
                }}
              >
                {equippedItem?.id === item.id ? "장착중" : "장착"}
              </Button>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

const renderItemDetails = (item: GameItem) => (
  <div css={styles.tooltipContent}>
    <Typography.Text style={{ color: colors.text.primary }}>
      {item.name}
    </Typography.Text>
    <Typography.Text type="secondary">{item.type}</Typography.Text>
    <Typography.Text type="warning">Level: {item.level}</Typography.Text>
    {item.damage && (
      <Typography.Text type="success">Damage: {item.damage}</Typography.Text>
    )}
    {item.defense && (
      <Typography.Text type="success">Defense: {item.defense}</Typography.Text>
    )}
  </div>
);

const styles = {
  container: css({
    minHeight: "500px",
    maxHeight: "60vh",
    overflowY: "auto",
    padding: "8px",
    backgroundColor: colors.background.dark,
  }),
  gridContainer: css({
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "8px",
    padding: "4px",
  }),
  gridItem: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    padding: "4px",
    backgroundColor: colors.background.medium,
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: colors.background.darker,
    },
  }),
  itemImage: css({
    border: `1px solid ${colors.border.primary}`,
  }),
  tooltipContent: css({
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  }),
};

export default GameInventory;
