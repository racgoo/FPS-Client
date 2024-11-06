import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Table,
  Card,
  Button,
  List,
  Input,
  Modal,
  Avatar,
  Badge,
  Typography,
  Tabs,
  Progress,
  Statistic,
  Row,
  Col,
  notification,
  Drawer,
  Tooltip,
  Popconfirm,
  Select,
} from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  TrophyOutlined,
  AimOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  FireOutlined,
  CrownOutlined,
  SettingOutlined,
  SoundOutlined,
  DollarOutlined,
  InboxOutlined,
  GiftOutlined,
  StarOutlined,
  SkinOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;
const { Search } = Input;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

interface Weapon {
  id: string;
  name: string;
  type: string;
  damage: number;
  accuracy: number;
  range: number;
  price: number;
  level: number;
  image: string;
}

interface Friend {
  id: string;
  name: string;
  status: "online" | "offline" | "in-game";
  game?: string;
  avatar: string;
}

interface Squad {
  id: string;
  name: string;
  members: Friend[];
}

export default function Component() {
  const [isWeaponModalOpen, setIsWeaponModalOpen] = useState(false);
  const [isShopDrawerOpen, setIsShopDrawerOpen] = useState(false);
  const [isInventoryDrawerOpen, setIsInventoryDrawerOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isFriendsDrawerOpen, setIsFriendsDrawerOpen] = useState(false);
  const [isSquadModalOpen, setIsSquadModalOpen] = useState(false);
  const [isDailyRewardModalOpen, setIsDailyRewardModalOpen] = useState(false);
  const [
    isCharacterCustomizationModalOpen,
    setIsCharacterCustomizationModalOpen,
  ] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [gold, setGold] = useState(10000);
  const [equippedWeapon, setEquippedWeapon] = useState<Weapon | null>(null);
  const [inventory, setInventory] = useState<Weapon[]>([]);
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [squad, setSquad] = useState<Squad | null>(null);
  const [dailyRewardClaimed, setDailyRewardClaimed] = useState(false);
  const [selectedGameMode, setSelectedGameMode] = useState("Team Deathmatch");

  const gameModes = [
    "Team Deathmatch",
    "Capture the Flag",
    "Domination",
    "Free for All",
  ];

  const gameRooms = [
    {
      key: "1",
      name: "Neon City Assault",
      players: "16/32",
      mode: "Team Deathmatch",
      map: "Neon City",
    },
    {
      key: "2",
      name: "Quantum Facility Siege",
      players: "24/64",
      mode: "Domination",
      map: "Quantum Facility",
    },
    {
      key: "3",
      name: "Cyberpunk Alley Showdown",
      players: "14/20",
      mode: "Capture the Flag",
      map: "Cyberpunk Alley",
    },
  ];

  const shopWeapons: Weapon[] = [
    {
      id: "w1",
      name: "Plasma Rifle",
      type: "Assault Rifle",
      damage: 35,
      accuracy: 75,
      range: 70,
      price: 1000,
      level: 0,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "w2",
      name: "Quantum Sniper",
      type: "Sniper Rifle",
      damage: 120,
      accuracy: 95,
      range: 100,
      price: 1500,
      level: 0,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "w3",
      name: "Nano Shotgun",
      type: "Shotgun",
      damage: 80,
      accuracy: 60,
      range: 30,
      price: 800,
      level: 0,
      image: "/placeholder.svg?height=100&width=200",
    },
  ];

  const missions = [
    {
      name: "Neon Assassin",
      description: "Eliminate 50 enemies in Neon City",
      progress: 30,
      reward: "500 XP",
    },
    {
      name: "Quantum Conqueror",
      description: "Win 10 matches in Quantum Facility",
      progress: 7,
      reward: "1000 XP",
    },
    {
      name: "Cyberpunk Legend",
      description: "Achieve a 20 kill streak",
      progress: 15,
      reward: "750 XP",
    },
  ];

  useEffect(() => {
    // Simulating friends data
    setFriends([
      {
        id: "f1",
        name: "CyberSniper",
        status: "online",
        game: "In Match: Neon City",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "f2",
        name: "QuantumRush",
        status: "offline",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "f3",
        name: "NeonBlade",
        status: "online",
        game: "In Lobby",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ]);
  }, []);

  const columns = [
    { title: "Game Room", dataIndex: "name", key: "name" },
    { title: "Players", dataIndex: "players", key: "players" },
    { title: "Mode", dataIndex: "mode", key: "mode" },
    { title: "Map", dataIndex: "map", key: "map" },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button type="primary" style={{ backgroundColor: "#722ed1" }}>
          Join
        </Button>
      ),
    },
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, inputMessage]);
      setInputMessage("");
    }
  };

  const buyWeapon = (weapon: Weapon) => {
    if (gold >= weapon.price) {
      setGold(gold - weapon.price);
      setInventory([
        ...inventory,
        { ...weapon, id: `inv-${inventory.length}` },
      ]);
      notification.success({
        message: "Weapon Purchased",
        description: `You have successfully purchased ${weapon.name}!`,
      });
    } else {
      notification.error({
        message: "Insufficient Funds",
        description: "You do not have enough gold to purchase this weapon.",
      });
    }
  };

  const equipWeapon = (weapon: Weapon) => {
    setEquippedWeapon(weapon);
    notification.success({
      message: "Weapon Equipped",
      description: `You have equipped ${weapon.name}!`,
    });
  };

  const upgradeWeapon = () => {
    if (selectedWeapon && selectedWeapon.level < 10) {
      const upgradeCost = (selectedWeapon.level + 1) * 500;
      if (gold >= upgradeCost) {
        setGold(gold - upgradeCost);
        const updatedWeapon = {
          ...selectedWeapon,
          level: selectedWeapon.level + 1,
          damage: Math.floor(selectedWeapon.damage * 1.1),
          accuracy: Math.min(100, Math.floor(selectedWeapon.accuracy * 1.05)),
          range: Math.floor(selectedWeapon.range * 1.05),
        };
        setInventory(
          inventory.map((w) => (w.id === updatedWeapon.id ? updatedWeapon : w))
        );
        setSelectedWeapon(updatedWeapon);
        if (equippedWeapon && equippedWeapon.id === updatedWeapon.id) {
          setEquippedWeapon(updatedWeapon);
        }
        notification.success({
          message: "Weapon Upgraded",
          description: `${updatedWeapon.name} has been upgraded to level ${updatedWeapon.level}!`,
        });
      } else {
        notification.error({
          message: "Insufficient Funds",
          description: "You do not have enough gold to upgrade this weapon.",
        });
      }
    }
  };

  const inviteFriendToSquad = (friend: Friend) => {
    if (squad) {
      if (squad.members.length < 4) {
        setSquad({
          ...squad,
          members: [...squad.members, friend],
        });
        notification.success({
          message: "Squad Invitation Sent",
          description: `Invitation sent to ${friend.name}!`,
        });
      } else {
        notification.warning({
          message: "Squad Full",
          description: "Your squad is already full (4 members).",
        });
      }
    } else {
      setSquad({
        id: "squad1",
        name: "My Squad",
        members: [friend],
      });
      notification.success({
        message: "Squad Created",
        description: `New squad created with ${friend.name}!`,
      });
    }
  };

  const kickFromSquad = (friend: Friend) => {
    if (squad) {
      setSquad({
        ...squad,
        members: squad.members.filter((member) => member.id !== friend.id),
      });
      notification.info({
        message: "Squad Member Removed",
        description: `${friend.name} has been removed from the squad.`,
      });
    }
  };

  const claimDailyReward = () => {
    const reward = Math.floor(Math.random() * 500) + 500;
    setGold(gold + reward);
    setDailyRewardClaimed(true);
    notification.success({
      message: "Daily Reward Claimed",
      description: `You've received ${reward} gold as your daily reward!`,
    });
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #000000, #434343)",
      }}
    >
      <Header style={{ background: "transparent", padding: "0 20px" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ background: "transparent" }}
        >
          <Menu.Item key="1" icon={<AimOutlined />}>
            Lobby
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<ShoppingCartOutlined />}
            onClick={() => setIsShopDrawerOpen(true)}
          >
            Shop
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<InboxOutlined />}
            onClick={() => setIsInventoryDrawerOpen(true)}
          >
            Inventory
          </Menu.Item>
          <Menu.Item key="4" icon={<TrophyOutlined />}>
            Achievements
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<TeamOutlined />}
            onClick={() => setIsFriendsDrawerOpen(true)}
          >
            Friends
          </Menu.Item>
          <Menu.Item
            key="6"
            icon={<GiftOutlined />}
            onClick={() => setIsDailyRewardModalOpen(true)}
          >
            Daily Reward
          </Menu.Item>
          <Menu.Item
            key="7"
            icon={<SkinOutlined />}
            onClick={() => setIsCharacterCustomizationModalOpen(true)}
          >
            Customize
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={300} style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <Card
            title={
              <Title level={4} style={{ color: "#fff" }}>
                Agent Profile
              </Title>
            }
            style={{
              margin: "16px",
              background: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              border: "1px solid #722ed1",
            }}
          >
            <Avatar
              size={84}
              icon={<UserOutlined />}
              style={{ backgroundColor: "#722ed1", marginBottom: "16px" }}
            />
            <Text strong style={{ color: "#fff", display: "block" }}>
              Agent: NeonShadow
            </Text>
            <Text style={{ color: "#d9d9d9" }}>Rank: Cyber Elite</Text>
            <Progress percent={75} status="active" strokeColor="#722ed1" />
            <Text style={{ color: "#d9d9d9" }}>XP: 7500 / 10000</Text>
            <Row gutter={16} style={{ marginTop: "16px" }}>
              <Col span={12}>
                <Statistic
                  title="Kills"
                  value={1337}
                  valueStyle={{ color: "#cf1322" }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="K/D"
                  value={1.34}
                  precision={2}
                  valueStyle={{ color: "#722ed1" }}
                />
              </Col>
            </Row>
            <Statistic
              title="Gold"
              value={gold}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
          <Button
            type="primary"
            icon={<FireOutlined />}
            style={{
              margin: "0 16px",
              width: "calc(100% - 32px)",
              backgroundColor: "#722ed1",
            }}
            onClick={() => setIsWeaponModalOpen(true)}
          >
            Customize Loadout
          </Button>
          <Button
            type="primary"
            icon={<TeamOutlined />}
            style={{
              margin: "16px",
              width: "calc(100% - 32px)",
              backgroundColor: "#722ed1",
            }}
            onClick={() => setIsSquadModalOpen(true)}
          >
            Manage Squad
          </Button>
        </Sider>
        <Layout style={{ padding: "0 24px 24px", background: "transparent" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "rgba(0, 0, 0, 0.7)",
              borderRadius: "8px",
            }}
          >
            <Tabs defaultActiveKey="1" style={{ color: "#fff" }}>
              <TabPane tab="Game Lobbies" key="1">
                <Title level={3} style={{ color: "#fff" }}>
                  Active Battlegrounds
                </Title>
                <Select
                  style={{ width: 200, marginBottom: 16 }}
                  placeholder="Select Game Mode"
                  onChange={(value) => setSelectedGameMode(value)}
                  value={selectedGameMode}
                >
                  {gameModes.map((mode) => (
                    <Option key={mode} value={mode}>
                      {mode}
                    </Option>
                  ))}
                </Select>
                <Table
                  columns={columns}
                  dataSource={gameRooms.filter(
                    (room) => room.mode === selectedGameMode
                  )}
                  style={{ background: "rgba(0, 0, 0, 0.5)", color: "#fff" }}
                />
              </TabPane>
              <TabPane tab="Missions" key="2">
                <Title level={3} style={{ color: "#fff" }}>
                  Daily Missions
                </Title>
                <List
                  itemLayout="horizontal"
                  dataSource={missions}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            icon={<TrophyOutlined />}
                            style={{ backgroundColor: "#722ed1" }}
                          />
                        }
                        title={
                          <Text style={{ color: "#fff" }}>{item.name}</Text>
                        }
                        description={
                          <div>
                            <Text style={{ color: "#d9d9d9" }}>
                              {item.description}
                            </Text>
                            <Progress
                              percent={
                                (item.progress /
                                  parseInt(item.reward.split(" ")[0])) *
                                100
                              }
                              status="active"
                              strokeColor="#722ed1"
                            />
                            <Text style={{ color: "#52c41a" }}>
                              Reward: {item.reward}
                            </Text>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                  style={{
                    background: "rgba(0, 0, 0, 0.5)",
                    padding: "16px",
                    borderRadius: "8px",
                  }}
                />
              </TabPane>
              <TabPane tab="Leaderboard" key="3">
                <Title level={3} style={{ color: "#fff" }}>
                  Top Agents
                </Title>
                <Table
                  dataSource={[
                    { key: "1", rank: 1, name: "HeadshotMaster", score: 10000 },
                    {
                      key: "2",
                      rank: 2,
                      name: "QuickScope_Queen",
                      score: 9500,
                    },
                    { key: "3", rank: 3, name: "Grenade_God", score: 9000 },
                  ]}
                  columns={[
                    { title: "Rank", dataIndex: "rank", key: "rank" },
                    { title: "Agent", dataIndex: "name", key: "name" },
                    { title: "Score", dataIndex: "score", key: "score" },
                  ]}
                  style={{ background: "rgba(0, 0, 0, 0.5)", color: "#fff" }}
                />
              </TabPane>
            </Tabs>
          </Content>
        </Layout>
        <Sider width={300} style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <Card
            title={
              <Title level={4} style={{ color: "#fff" }}>
                Squad Comms
              </Title>
            }
            style={{
              margin: "16px",
              background: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              border: "1px solid #722ed1",
            }}
          >
            {squad ? (
              <List
                itemLayout="horizontal"
                dataSource={squad.members}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button
                        icon={<SoundOutlined />}
                        shape="circle"
                        style={{
                          backgroundColor: "#722ed1",
                          borderColor: "#722ed1",
                        }}
                      />,
                      <Popconfirm
                        title="Are you sure you want to kick this member?"
                        onConfirm={() => kickFromSquad(item)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          icon={<UserOutlined />}
                          shape="circle"
                          style={{
                            backgroundColor: "#ff4d4f",
                            borderColor: "#ff4d4f",
                          }}
                        />
                      </Popconfirm>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<Text style={{ color: "#fff" }}>{item.name}</Text>}
                      description={
                        <Text type="secondary" style={{ color: "#8c8c8c" }}>
                          {item.status}
                        </Text>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Text style={{ color: "#fff" }}>
                No squad formed yet. Invite friends to create a squad!
              </Text>
            )}
          </Card>
          <Card
            title={
              <Title level={4} style={{ color: "#fff" }}>
                Tactical Chat
              </Title>
            }
            style={{
              margin: "16px",
              background: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              border: "1px solid #722ed1",
            }}
          >
            <List
              size="small"
              bordered
              dataSource={messages}
              renderItem={(item) => (
                <List.Item style={{ color: "#fff" }}>{item}</List.Item>
              )}
              style={{
                height: "200px",
                overflowY: "auto",
                marginBottom: "16px",
                borderColor: "#722ed1",
                background: "rgba(0, 0, 0, 0.5)",
              }}
            />
            <Search
              placeholder="Type a message"
              enterButton="Send"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onSearch={handleSendMessage}
              style={{
                background: "rgba(0, 0, 0, 0.5)",
                borderColor: "#722ed1",
              }}
            />
          </Card>
        </Sider>
      </Layout>
      <Modal
        title={
          <Title level={3} style={{ color: "#fff" }}>
            Weapon Customization
          </Title>
        }
        visible={isWeaponModalOpen}
        onOk={() => setIsWeaponModalOpen(false)}
        onCancel={() => setIsWeaponModalOpen(false)}
        style={{ top: 20 }}
        bodyStyle={{ background: "rgba(0, 0, 0, 0.8)", color: "#fff" }}
        headerStyle={{ background: "#722ed1", borderBottom: "none" }}
      >
        {equippedWeapon ? (
          <Card
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              color: "#fff",
              border: "1px solid #722ed1",
            }}
          >
            <Title level={4} style={{ color: "#fff" }}>
              {equippedWeapon.name}
            </Title>
            <img
              src={equippedWeapon.image}
              alt={equippedWeapon.name}
              style={{ width: "100%", marginBottom: "16px" }}
            />
            <p>
              <strong>Type:</strong> {equippedWeapon.type}
            </p>
            <p>
              <strong>Damage:</strong>{" "}
              <Progress
                percent={equippedWeapon.damage}
                status="active"
                strokeColor="#722ed1"
              />
            </p>
            <p>
              <strong>Accuracy:</strong>{" "}
              <Progress
                percent={equippedWeapon.accuracy}
                status="active"
                strokeColor="#52c41a"
              />
            </p>
            <p>
              <strong>Range:</strong>{" "}
              <Progress
                percent={equippedWeapon.range}
                status="active"
                strokeColor="#faad14"
              />
            </p>
            <p>
              <strong>Level:</strong> {equippedWeapon.level}
            </p>
            <Button
              type="primary"
              onClick={() => setIsUpgradeModalOpen(true)}
              style={{ marginTop: "16px", backgroundColor: "#722ed1" }}
            >
              Upgrade Weapon
            </Button>
          </Card>
        ) : (
          <Text style={{ color: "#fff" }}>
            No weapon equipped. Visit the inventory to equip a weapon.
          </Text>
        )}
      </Modal>
      <Drawer
        title={
          <Title level={3} style={{ color: "#fff" }}>
            Weapon Shop
          </Title>
        }
        placement="right"
        onClose={() => setIsShopDrawerOpen(false)}
        visible={isShopDrawerOpen}
        width={400}
        bodyStyle={{ background: "rgba(0, 0, 0, 0.8)", color: "#fff" }}
        headerStyle={{ background: "#722ed1", borderBottom: "none" }}
      >
        <List
          itemLayout="vertical"
          dataSource={shopWeapons}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  onClick={() => buyWeapon(item)}
                  style={{ backgroundColor: "#722ed1" }}
                >
                  Buy for {item.price} gold
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar size={64} shape="square" src={item.image} />}
                title={
                  <Text style={{ color: "#fff", fontSize: "18px" }}>
                    {item.name}
                  </Text>
                }
                description={
                  <div>
                    <Text style={{ color: "#d9d9d9" }}>{item.type}</Text>
                    <br />
                    <Text style={{ color: "#faad14" }}>
                      Damage: {item.damage}
                    </Text>
                    <br />
                    <Text style={{ color: "#52c41a" }}>
                      Accuracy: {item.accuracy}
                    </Text>
                    <br />
                    <Text style={{ color: "#1890ff" }}>
                      Range: {item.range}
                    </Text>
                  </div>
                }
              />
            </List.Item>
          )}
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            padding: "16px",
            borderRadius: "8px",
          }}
        />
      </Drawer>
      <Drawer
        title={
          <Title level={3} style={{ color: "#fff" }}>
            Inventory
          </Title>
        }
        placement="right"
        onClose={() => setIsInventoryDrawerOpen(false)}
        visible={isInventoryDrawerOpen}
        width={400}
        bodyStyle={{ background: "rgba(0, 0, 0, 0.8)", color: "#fff" }}
        headerStyle={{ background: "#722ed1", borderBottom: "none" }}
      >
        <List
          itemLayout="vertical"
          dataSource={inventory}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  onClick={() => equipWeapon(item)}
                  style={{ backgroundColor: "#722ed1" }}
                >
                  {equippedWeapon && equippedWeapon.id === item.id
                    ? "Equipped"
                    : "Equip"}
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar size={64} shape="square" src={item.image} />}
                title={
                  <Text style={{ color: "#fff", fontSize: "18px" }}>
                    {item.name}
                  </Text>
                }
                description={
                  <div>
                    <Text style={{ color: "#d9d9d9" }}>{item.type}</Text>
                    <br />
                    <Text style={{ color: "#faad14" }}>
                      Level: {item.level}
                    </Text>
                    <br />
                    <Text style={{ color: "#52c41a" }}>
                      Damage: {item.damage}
                    </Text>
                    <br />
                    <Text style={{ color: "#1890ff" }}>
                      Accuracy: {item.accuracy}
                    </Text>
                  </div>
                }
              />
            </List.Item>
          )}
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            padding: "16px",
            borderRadius: "8px",
          }}
        />
      </Drawer>
      <Modal
        title={
          <Title level={3} style={{ color: "#fff" }}>
            Upgrade Weapon
          </Title>
        }
        visible={isUpgradeModalOpen}
        onOk={() => {
          upgradeWeapon();
          setIsUpgradeModalOpen(false);
        }}
        onCancel={() => setIsUpgradeModalOpen(false)}
        style={{ top: 20 }}
        bodyStyle={{ background: "rgba(0, 0, 0, 0.8)", color: "#fff" }}
        headerStyle={{ background: "#722ed1", borderBottom: "none" }}
      >
        {selectedWeapon && (
          <Card
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              color: "#fff",
              border: "1px solid #722ed1",
            }}
          >
            <Title level={4} style={{ color: "#fff" }}>
              {selectedWeapon.name}
            </Title>
            <p>
              <strong>Current Level:</strong> {selectedWeapon.level}
            </p>
            <p>
              <strong>Upgrade Cost:</strong> {(selectedWeapon.level + 1) * 500}{" "}
              gold
            </p>
            <p>
              <strong>New Level:</strong> {selectedWeapon.level + 1}
            </p>
            <p>
              <strong>Damage Increase:</strong> +10%
            </p>
            <p>
              <strong>Accuracy Increase:</strong> +5%
            </p>
            <p>
              <strong>Range Increase:</strong> +5%
            </p>
          </Card>
        )}
      </Modal>
      <Drawer
        title={
          <Title level={3} style={{ color: "#fff" }}>
            Friends List
          </Title>
        }
        placement="right"
        onClose={() => setIsFriendsDrawerOpen(false)}
        visible={isFriendsDrawerOpen}
        width={300}
        bodyStyle={{ background: "rgba(0, 0, 0, 0.8)", color: "#fff" }}
        headerStyle={{ background: "#722ed1", borderBottom: "none" }}
      >
        <List
          itemLayout="horizontal"
          dataSource={friends}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Tooltip title="Invite to Squad">
                  <Button
                    icon={<TeamOutlined />}
                    onClick={() => inviteFriendToSquad(item)}
                    style={{
                      backgroundColor: "#722ed1",
                      borderColor: "#722ed1",
                    }}
                  />
                </Tooltip>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<Text style={{ color: "#fff" }}>{item.name}</Text>}
                description={
                  <Text type="secondary" style={{ color: "#8c8c8c" }}>
                    {item.status === "online"
                      ? item.game || "Online"
                      : "Offline"}
                  </Text>
                }
              />
              <Badge
                status={item.status === "online" ? "success" : "default"}
              />
            </List.Item>
          )}
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            padding: "16px",
            borderRadius: "8px",
          }}
        />
      </Drawer>
      <Modal
        title={
          <Title level={3} style={{ color: "#fff" }}>
            Manage Squad
          </Title>
        }
        visible={isSquadModalOpen}
        onOk={() => setIsSquadModalOpen(false)}
        onCancel={() => setIsSquadModalOpen(false)}
        style={{ top: 20 }}
        bodyStyle={{ background: "rgba(0, 0, 0, 0.8)", color: "#fff" }}
        headerStyle={{ background: "#722ed1", borderBottom: "none" }}
      >
        {squad ? (
          <List
            itemLayout="horizontal"
            data
            Source={squad.members}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Popconfirm
                    title="Are you sure you want to kick this member?"
                    onConfirm={() => kickFromSquad(item)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger>Kick</Button>
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<Text style={{ color: "#fff" }}>{item.name}</Text>}
                  description={
                    <Text type="secondary" style={{ color: "#8c8c8c" }}>
                      {item.status}
                    </Text>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <Text style={{ color: "#fff" }}>
            No squad formed yet. Invite friends to create a squad!
          </Text>
        )}
      </Modal>
      <Modal
        title={
          <Title level={3} style={{ color: "#fff" }}>
            Daily Reward
          </Title>
        }
        visible={isDailyRewardModalOpen}
        onOk={() => {
          claimDailyReward();
          setIsDailyRewardModalOpen(false);
        }}
        onCancel={() => setIsDailyRewardModalOpen(false)}
        style={{ top: 20 }}
        bodyStyle={{ background: "rgba(0, 0, 0, 0.8)", color: "#fff" }}
        headerStyle={{ background: "#722ed1", borderBottom: "none" }}
      >
        {dailyRewardClaimed ? (
          <Text style={{ color: "#fff" }}>
            You've already claimed your daily reward. Come back tomorrow!
          </Text>
        ) : (
          <div>
            <Text style={{ color: "#fff" }}>
              Claim your daily reward! You can earn between 500 and 1000 gold.
            </Text>
            <Button
              type="primary"
              onClick={claimDailyReward}
              style={{ marginTop: "16px", backgroundColor: "#722ed1" }}
            >
              Claim Reward
            </Button>
          </div>
        )}
      </Modal>
      <Modal
        title={
          <Title level={3} style={{ color: "#fff" }}>
            Character Customization
          </Title>
        }
        visible={isCharacterCustomizationModalOpen}
        onOk={() => setIsCharacterCustomizationModalOpen(false)}
        onCancel={() => setIsCharacterCustomizationModalOpen(false)}
        style={{ top: 20 }}
        bodyStyle={{ background: "rgba(0, 0, 0, 0.8)", color: "#fff" }}
        headerStyle={{ background: "#722ed1", borderBottom: "none" }}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Appearance" key="1">
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "20px",
              }}
            >
              <div>
                <Text style={{ color: "#fff" }}>Hair Style</Text>
                <Select style={{ width: 120 }} defaultValue="style1">
                  <Option value="style1">Style 1</Option>
                  <Option value="style2">Style 2</Option>
                  <Option value="style3">Style 3</Option>
                </Select>
              </div>
              <div>
                <Text style={{ color: "#fff" }}>Hair Color</Text>
                <Select style={{ width: 120 }} defaultValue="black">
                  <Option value="black">Black</Option>
                  <Option value="brown">Brown</Option>
                  <Option value="blonde">Blonde</Option>
                </Select>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <Text style={{ color: "#fff" }}>Face</Text>
                <Select style={{ width: 120 }} defaultValue="face1">
                  <Option value="face1">Face 1</Option>
                  <Option value="face2">Face 2</Option>
                  <Option value="face3">Face 3</Option>
                </Select>
              </div>
              <div>
                <Text style={{ color: "#fff" }}>Body Type</Text>
                <Select style={{ width: 120 }} defaultValue="average">
                  <Option value="slim">Slim</Option>
                  <Option value="average">Average</Option>
                  <Option value="muscular">Muscular</Option>
                </Select>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Outfit" key="2">
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "20px",
              }}
            >
              <div>
                <Text style={{ color: "#fff" }}>Top</Text>
                <Select style={{ width: 120 }} defaultValue="tshirt">
                  <Option value="tshirt">T-Shirt</Option>
                  <Option value="jacket">Jacket</Option>
                  <Option value="armor">Armor</Option>
                </Select>
              </div>
              <div>
                <Text style={{ color: "#fff" }}>Bottom</Text>
                <Select style={{ width: 120 }} defaultValue="pants">
                  <Option value="pants">Pants</Option>
                  <Option value="shorts">Shorts</Option>
                  <Option value="skirt">Skirt</Option>
                </Select>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <Text style={{ color: "#fff" }}>Shoes</Text>
                <Select style={{ width: 120 }} defaultValue="boots">
                  <Option value="boots">Boots</Option>
                  <Option value="sneakers">Sneakers</Option>
                  <Option value="sandals">Sandals</Option>
                </Select>
              </div>
              <div>
                <Text style={{ color: "#fff" }}>Accessory</Text>
                <Select style={{ width: 120 }} defaultValue="none">
                  <Option value="none">None</Option>
                  <Option value="hat">Hat</Option>
                  <Option value="glasses">Glasses</Option>
                </Select>
              </div>
            </div>
          </TabPane>
        </Tabs>
        <Button
          type="primary"
          style={{ marginTop: "20px", backgroundColor: "#722ed1" }}
        >
          Save Changes
        </Button>
      </Modal>
    </Layout>
  );
}
