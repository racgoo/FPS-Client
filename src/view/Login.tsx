import {
  KeyOutlined,
  LoginOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Form, Input, Typography } from "antd";
import { css } from "@emotion/react";
import BackgroundImage from "/login-asset/login-background.webp";
import GradientButton, {
  GradientColor,
} from "../components/button/GradientButton";
import useAuth from "../view-model/auth/useAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const styles = useStyle();
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const handleLogin = async (values: { email: string; password: string }) => {
    await login(values);
  };

  const handleRegister = () => {
    navigate("/register", { replace: true });
  };

  return (
    <div css={styles.container}>
      <Typography.Title level={1}>Racgoo Online</Typography.Title>
      <Form onFinish={handleLogin}>
        <div css={styles.inputBox}>
          <Form.Item
            name="email"
            style={{ width: "100%", marginBottom: 0 }}
            rules={[
              { required: true, message: "이메일을 입력해주세요!" },
              {
                type: "email",
                message: "유효하지 않은 이메일입니다!",
              },
            ]}
            hasFeedback
          >
            <Input
              size="large"
              placeholder="이메일"
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            style={{ width: "100%", marginBottom: 0 }}
            rules={[
              { required: true, message: "비밀번호를 입력해주세요!" },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                  "비밀번호는 최소 8자 이상, 하나의 문자와 숫자를 포함해야 합니다.",
              },
            ]}
            hasFeedback
          >
            <Input
              size="large"
              placeholder="비밀번호"
              prefix={<KeyOutlined />}
              type="password"
            />
          </Form.Item>
          <Form.Item style={{ width: "100%", marginBottom: 0 }} shouldUpdate>
            {({ getFieldsError, getFieldsValue }) => {
              const hasError = getFieldsError().some(
                ({ errors }) => errors.length
              );
              const values = getFieldsValue();
              const isEmpty = !values.email || !values.password;
              const isValid = hasError || isEmpty;
              return (
                <GradientButton
                  icon={<LoginOutlined />}
                  loading={loading}
                  text={"로그인"}
                  htmlType="submit"
                  disabled={isValid}
                />
              );
            }}
          </Form.Item>
          <GradientButton
            icon={<SolutionOutlined />}
            loading={loading}
            text={"회원가입"}
            disabled={false}
            gradient={GradientColor.SECONDARY}
            onClick={handleRegister}
          />
        </div>
      </Form>
    </div>
  );
}

function useStyle() {
  return {
    container: css({
      display: "flex",
      justifyContent: "center",
      backgroundImage: `url(${BackgroundImage})`,
      backgroundOrigin: "border-box",
      backgroundSize: "cover",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
      gap: "10px",
    }),
    inputBox: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
      padding: "10px",
      width: "300px",
    }),
  };
}

export default Login;
