import { Layout, Tabs, Modal } from "antd";
import { useEffect, useState } from "react";
import GameHeader from "@src/components/layout/GameHeader";
import GameRoomList from "@src/components/game/GameRoomList";
import MissionList from "@src/components/mission/MissionList";
import GameInventory from "@src/components/inventory/GameInventory";
import ChatScreen from "@src/components/chat/ChatScreen";
import ChatInput from "@src/components/chat/ChatInput";
import useInventory from "@src/view-model/inventory/useInventory";
import { css } from "@emotion/react";
import { colors } from "@src/style/constants/colors";
import { sizes } from "@src/style/constants/sizes";
import useSocket from "@src/view-model/socket/useSocket";

const { Content, Sider } = Layout;
const { TabPane } = Tabs;

const Home = () => {
  const { inventory, equippedItem, equipItem } = useInventory();
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const socket = useSocket();
  useEffect(() => {
    socket.connect();

    socket.on("chat:channel-message", (data) => {
      setMessages((prev) => [...prev, data.content]);
    });
  }, []);

  const handleSendMessage = (message: string) => {
    socket.emit("chat:channel-message", {
      content: message,
    });
  };

  return (
    <Layout css={styles.layout}>
      <GameHeader
        username="Username"
        gold={1000}
        onInventoryClick={() => setIsInventoryOpen(true)}
      />
      <Layout css={styles.mainContent}>
        <Content css={styles.content}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Game Rooms" key="1">
              <GameRoomList />
            </TabPane>
            <TabPane tab="Missions" key="2">
              <MissionList />
            </TabPane>
          </Tabs>
        </Content>
        <Sider width={300} css={styles.sider}>
          <div css={styles.siderContent}>
            <ChatScreen messages={messages} />
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </Sider>
      </Layout>

      <Modal
        title="Inventory"
        open={isInventoryOpen}
        onCancel={() => setIsInventoryOpen(false)}
        width={800}
        footer={null}
        css={styles.inventoryModal}
      >
        <GameInventory
          inventory={inventory}
          equippedItem={equippedItem}
          onEquip={equipItem}
        />
      </Modal>
    </Layout>
  );
};

const styles = {
  layout: css({
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  }),
  mainContent: css({
    flex: 1,
    overflow: "hidden",
  }),
  content: css({
    padding: sizes.spacing.md,
    background: colors.background.dark,
    overflowY: "auto",
    height: "100%",
  }),
  sider: css({
    background: colors.background.dark,
    height: "100%",
  }),
  siderContent: css({
    height: "100%",
    overflowY: "auto",
    padding: sizes.spacing.md,
  }),
  inventoryModal: css({
    "& .ant-modal-content": {
      background: colors.background.dark,
      borderRadius: "12px",
    },
    "& .ant-modal-header": {
      background: colors.background.dark,
      borderBottom: `1px solid ${colors.border.primary}`,
      borderRadius: "12px 12px 0 0",
    },
    "& .ant-modal-title": {
      color: colors.text.primary,
    },
    "& .ant-modal-close": {
      color: colors.text.secondary,
    },
  }),
};

export default Home;
