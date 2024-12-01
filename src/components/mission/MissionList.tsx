import { List, Progress, Typography } from "antd";
import { css } from "@emotion/react";
import { colors } from "@src/style/constants/colors";
import { effects } from "@src/style/constants/effects";
import { typography } from "@src/style/constants/typography";

interface Mission {
  name: string;
  description: string;
  progress: number;
  reward: string;
}

const MissionList = () => {
  const missions: Mission[] = [
    {
      name: "Neon Assassin",
      description: "Eliminate 50 enemies in Neon City",
      progress: 30,
      reward: "500 XP",
    },
    // ... 다른 미션 데이터
  ];

  return (
    <List
      itemLayout="horizontal"
      dataSource={missions}
      renderItem={(item) => (
        <List.Item css={styles.missionItem}>
          <List.Item.Meta
            title={
              <Typography.Title level={5} css={styles.missionTitle}>
                {item.name}
              </Typography.Title>
            }
            description={
              <Typography.Text css={styles.description}>
                {item.description}
              </Typography.Text>
            }
          />
          <div css={styles.progressSection}>
            <Progress
              percent={item.progress}
              strokeColor={{
                "0%": colors.primary.light,
                "100%": colors.primary.dark,
              }}
              trailColor={colors.background.darker}
            />
            <Typography.Text css={styles.reward}>
              Reward: {item.reward}
            </Typography.Text>
          </div>
        </List.Item>
      )}
    />
  );
};

const styles = {
  missionItem: css({
    padding: "16px",
    backgroundColor: colors.background.medium,
    marginBottom: "8px",
    borderRadius: effects.borderRadius.lg,
    border: `1px solid ${colors.gray[700]}`,
    transition: effects.transition.default,
    "&:hover": {
      backgroundColor: colors.background.light,
      borderColor: colors.primary.main,
      transform: "translateY(-2px)",
    },
  }),
  missionTitle: css({
    color: colors.text.primary,
    margin: 0,
    fontSize: typography.fontSizes.lg,
  }),
  description: css({
    color: colors.text.secondary,
    fontSize: typography.fontSizes.md,
  }),
  progressSection: css({
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    minWidth: "200px",
  }),
  reward: css({
    color: colors.primary.light,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
  }),
};

export default MissionList;
