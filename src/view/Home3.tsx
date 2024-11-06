import { Button, Card, Col, Row, Typography, Spin } from "antd";
import { useEffect, useState } from "react";
import { pushToast } from "@shared/toast/toast";
import { css } from "@emotion/react";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    shop: [],
    userInfo: {},
    gameRooms: [],
    friends: [],
  });

  useEffect(() => {
    // 데이터 로딩 시뮬레이션
    setTimeout(() => {
      setData({
        shop: ["아이템1", "아이템2", "아이템3"],
        userInfo: { name: "사용자", level: 10 },
        gameRooms: ["방1", "방2", "방3"],
        friends: ["친구1", "친구2", "친구3"],
      });
      setLoading(false);
    }, 2000);
  }, []);

  const handleClick = () => {
    pushToast({
      type: "success",
      message: "클릭되었습니다!",
    });
  };

  if (loading) {
    return (
      <div
        css={css`
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
        `}
      >
        <Spin
          size="large"
          css={css`
            .ant-spin-dot-item {
              background-color: #00f2fe;
            }
          `}
        />
      </div>
    );
  }

  return (
    <div
      css={css`
        min-height: 100vh;
        background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
        padding: 40px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
      `}
    >
      <Typography.Title
        level={1}
        css={css`
          color: #fff !important;
          text-shadow: 0 0 10px rgba(79, 172, 254, 0.5),
            0 0 20px rgba(0, 242, 254, 0.3);
          font-size: 3.5rem !important;
          text-align: center;
          margin-bottom: 0 !important;
        `}
      >
        FPS 게임 로비
      </Typography.Title>

      <Row
        gutter={[24, 24]}
        justify="center"
        css={css`
          width: 100%;
          max-width: 1400px;
        `}
      >
        <Col xs={24} sm={12} lg={6}>
          <Card
            title="상점"
            bordered={false}
            css={css`
              background: rgba(255, 255, 255, 0.1) !important;
              backdrop-filter: blur(10px);
              border-radius: 15px !important;
              box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
              border: 1px solid rgba(255, 255, 255, 0.18);
              transition: transform 0.3s ease;
              &:hover {
                transform: translateY(-5px);
              }
              .ant-card-head {
                background: transparent;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                .ant-card-head-title {
                  color: #fff;
                  font-size: 1.2rem;
                }
              }
            `}
          >
            {data.shop.map((item, index) => (
              <p
                key={index}
                css={css`
                  color: #00f2fe;
                  font-size: 1.1rem;
                  margin: 10px 0;
                  padding: 8px;
                  border-radius: 8px;
                  background: rgba(0, 242, 254, 0.1);
                  transition: all 0.3s ease;
                  &:hover {
                    background: rgba(0, 242, 254, 0.2);
                    transform: scale(1.02);
                  }
                `}
              >
                {item}
              </p>
            ))}
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            title="내 정보"
            bordered={false}
            css={css`
              background: rgba(255, 255, 255, 0.1) !important;
              backdrop-filter: blur(10px);
              border-radius: 15px !important;
              box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
              border: 1px solid rgba(255, 255, 255, 0.18);
              transition: transform 0.3s ease;
              &:hover {
                transform: translateY(-5px);
              }
              .ant-card-head {
                background: transparent;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                .ant-card-head-title {
                  color: #fff;
                  font-size: 1.2rem;
                }
              }
            `}
          >
            <p
              css={css`
                color: #fff;
                font-size: 1.1rem;
                margin: 10px 0;
              `}
            >
              이름: {data.userInfo.name}
            </p>
            <p
              css={css`
                color: #fff;
                font-size: 1.1rem;
                margin: 10px 0;
              `}
            >
              레벨: {data.userInfo.level}
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            title="게임 방 리스트"
            bordered={false}
            css={css`
              background: rgba(255, 255, 255, 0.1) !important;
              backdrop-filter: blur(10px);
              border-radius: 15px !important;
              box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
              border: 1px solid rgba(255, 255, 255, 0.18);
              transition: transform 0.3s ease;
              &:hover {
                transform: translateY(-5px);
              }
              .ant-card-head {
                background: transparent;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                .ant-card-head-title {
                  color: #fff;
                  font-size: 1.2rem;
                }
              }
            `}
          >
            {data.gameRooms.map((room, index) => (
              <p
                key={index}
                css={css`
                  color: #00f2fe;
                  font-size: 1.1rem;
                  margin: 10px 0;
                  padding: 8px;
                  border-radius: 8px;
                  background: rgba(0, 242, 254, 0.1);
                  transition: all 0.3s ease;
                  &:hover {
                    background: rgba(0, 242, 254, 0.2);
                    transform: scale(1.02);
                  }
                `}
              >
                {room}
              </p>
            ))}
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            title="친구 목록"
            bordered={false}
            css={css`
              background: rgba(255, 255, 255, 0.1) !important;
              backdrop-filter: blur(10px);
              border-radius: 15px !important;
              box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
              border: 1px solid rgba(255, 255, 255, 0.18);
              transition: transform 0.3s ease;
              &:hover {
                transform: translateY(-5px);
              }
              .ant-card-head {
                background: transparent;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                .ant-card-head-title {
                  color: #fff;
                  font-size: 1.2rem;
                }
              }
            `}
          >
            {data.friends.map((friend, index) => (
              <p
                key={index}
                css={css`
                  color: #00f2fe;
                  font-size: 1.1rem;
                  margin: 10px 0;
                  padding: 8px;
                  border-radius: 8px;
                  background: rgba(0, 242, 254, 0.1);
                  transition: all 0.3s ease;
                  &:hover {
                    background: rgba(0, 242, 254, 0.2);
                    transform: scale(1.02);
                  }
                `}
              >
                {friend}
              </p>
            ))}
          </Card>
        </Col>
      </Row>
      <Button
        type="primary"
        onClick={handleClick}
        css={css`
          margin-top: 20px;
          width: 100%;
          max-width: 400px;
          height: 50px;
          font-size: 1.2rem;
          border-radius: 25px;
          background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
          border: none;
          box-shadow: 0 4px 15px rgba(0, 242, 254, 0.4);
          transition: all 0.3s ease;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 242, 254, 0.6);
          }
        `}
      >
        클릭하세요
      </Button>
    </div>
  );
};

export default Home;
