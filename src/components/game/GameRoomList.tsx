import { Button, Table } from "antd";
import { css } from "@emotion/react";
import { colors } from "@src/style/constants/colors";
import { effects } from "@src/style/constants/effects";
import { typography } from "@src/style/constants/typography";

interface GameRoom {
  key: string;
  name: string;
  players: string;
  mode: string;
  map: string;
}

const GameRoomList = () => {
  const gameRooms: GameRoom[] = [
    {
      key: "1",
      name: "Neon City Assault",
      players: "16/32",
      mode: "Team Deathmatch",
      map: "Neon City",
    },
    // ... 다른 게임룸 데이터
  ];

  const columns = [
    {
      title: "Game Room",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span css={styles.roomName}>{text}</span>,
    },
    {
      title: "Players",
      dataIndex: "players",
      key: "players",
      render: (text: string) => <span css={styles.players}>{text}</span>,
    },
    {
      title: "Mode",
      dataIndex: "mode",
      key: "mode",
      render: (text: string) => <span css={styles.mode}>{text}</span>,
    },
    {
      title: "Map",
      dataIndex: "map",
      key: "map",
      render: (text: string) => <span css={styles.map}>{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: () => <Button css={styles.joinButton}>Join</Button>,
    },
  ];

  return (
    <Table
      dataSource={gameRooms}
      columns={columns}
      css={styles.table}
      pagination={false}
    />
  );
};

const styles = {
  table: css({
    "& .ant-table": {
      background: colors.background.medium,
      borderRadius: effects.borderRadius.lg,
    },
    "& .ant-table-thead > tr > th": {
      background: colors.background.darker,
      color: colors.text.primary,
      fontSize: typography.fontSizes.md,
      borderBottom: `1px solid ${colors.border.primary}`,
    },
    "& .ant-table-tbody > tr > td": {
      background: colors.background.medium,
      borderBottom: `1px solid ${colors.gray[700]}`,
    },
    "& .ant-table-tbody > tr:hover > td": {
      background: colors.background.light,
    },
  }),
  roomName: css({
    color: colors.text.primary,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
  }),
  players: css({
    color: colors.text.secondary,
  }),
  mode: css({
    color: colors.primary.light,
  }),
  map: css({
    color: colors.text.secondary,
  }),
  joinButton: css({
    background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.primary.dark})`,
    border: "none",
    color: colors.text.primary,
    fontWeight: typography.fontWeights.medium,
    transition: effects.transition.default,
    "&:hover": {
      background: `linear-gradient(135deg, ${colors.primary.light}, ${colors.primary.main})`,
      transform: "translateY(-1px)",
    },
  }),
};

export default GameRoomList;
