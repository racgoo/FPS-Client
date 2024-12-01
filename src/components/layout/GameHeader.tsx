import { Layout, Typography, Avatar, Space, Button } from "antd";
import { UserOutlined, GoldOutlined, InboxOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { colors } from "@src/style/constants/colors";
import { sizes } from "@src/style/constants/sizes";

const { Header } = Layout;

interface GameHeaderProps {
  username: string;
  gold: number;
  onInventoryClick: () => void;
}

const GameHeader = ({ username, gold, onInventoryClick }: GameHeaderProps) => {
  return (
    <Header css={styles.header}>
      <div css={styles.headerContent}>
        <Typography css={styles.logo}>GAME TITLE</Typography>
        <Space size="large">
          <Button
            type="text"
            icon={<InboxOutlined />}
            onClick={onInventoryClick}
            css={styles.inventoryButton}
          >
            Inventory
          </Button>
          <div css={styles.userInfo}>
            <Avatar size="small" icon={<UserOutlined />} />
            <Typography.Text css={styles.username}>{username}</Typography.Text>
          </div>
          <div css={styles.goldInfo}>
            <GoldOutlined css={styles.goldIcon} />
            <Typography.Text css={styles.goldAmount}>
              {gold.toLocaleString()}
            </Typography.Text>
          </div>
        </Space>
      </div>
    </Header>
  );
};

const styles = {
  header: css({
    background: colors.background.darker,
    padding: `0 ${sizes.spacing.lg}`,
    borderBottom: `1px solid ${colors.border.primary}`,
  }),
  headerContent: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1600px",
    margin: "0 auto",
    width: "100%",
  }),
  logo: css({
    color: colors.text.primary,
    margin: 0,
  }),
  userInfo: css({
    display: "flex",
    alignItems: "center",
    gap: sizes.spacing.sm,
    padding: `${sizes.spacing.xs} ${sizes.spacing.sm}`,
    background: colors.background.medium,
    borderRadius: "8px",
  }),
  username: css({
    color: colors.text.primary,
    marginLeft: sizes.spacing.xs,
  }),
  goldInfo: css({
    display: "flex",
    alignItems: "center",
    gap: sizes.spacing.sm,
    padding: `${sizes.spacing.xs} ${sizes.spacing.sm}`,
    background: colors.background.medium,
    borderRadius: "8px",
  }),
  goldIcon: css({
    color: "#FFD700",
    fontSize: "16px",
  }),
  goldAmount: css({
    color: colors.text.primary,
  }),
  inventoryButton: css({
    color: colors.text.primary,
    fontSize: "16px",
    padding: `${sizes.spacing.sm} ${sizes.spacing.md}`,
    background: colors.background.medium,
    borderRadius: "8px",
    "&:hover": {
      color: colors.primary.light,
      background: colors.background.darker,
    },
  }),
};

export default GameHeader;
