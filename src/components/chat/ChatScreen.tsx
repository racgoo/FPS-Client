import { FC } from "react";
import { Card, List, Typography } from "antd";
import { css } from "@emotion/react";
import { colors } from "@src/style/constants/colors";
import { sizes } from "@src/style/constants/sizes";

const ChatScreen: FC<{
  messages: string[];
}> = ({ messages }) => {
  const styles = useStyles();

  return (
    <div>
      <Card
        title={<Typography css={styles.title}>Tactical Chat</Typography>}
        css={styles.card}
      >
        <List
          size="small"
          bordered
          dataSource={messages}
          renderItem={(item) => (
            <List.Item css={styles.listItem}>{item}</List.Item>
          )}
          css={styles.list}
        />
      </Card>
    </div>
  );
};

const useStyles = () => ({
  title: css({
    color: colors.text.primary,
  }),
  card: css({
    margin: sizes.spacing.md,
    background: colors.background.dark,
    color: colors.text.primary,
    border: `1px solid ${colors.border.primary}`,
  }),
  list: css({
    height: sizes.height.chat,
    overflowY: "auto",
    marginBottom: sizes.spacing.md,
    borderColor: colors.border.primary,
    background: colors.background.medium,
  }),
  listItem: css({
    color: colors.text.primary,
  }),
});

export default ChatScreen;
