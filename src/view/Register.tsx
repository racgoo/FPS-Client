import {
  KeyOutlined,
  LeftOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { css } from "@emotion/react";
import { Button, Form, Input, Typography } from "antd";
import GradientButton from "../components/button/GradientButton";
import { useCallback } from "react";
import useRegister from "../view-model/auth/useRegister";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const styles = useStyle();
  const navigate = useNavigate();
  const { getEmailDuplication, loading, register } = useRegister();
  const [form] = Form.useForm();

  const handleRegister = (values: {
    email: string;
    name: string;
    password: string;
    passwordCheck: string;
  }) => {
    register(values);
  };

  const validateEmailDuplication = useCallback(
    async (_: unknown, value: string) => {
      const duplicated = await getEmailDuplication(value);
      if (duplicated) {
        return Promise.reject(new Error("이미 존재하는 이메일입니다."));
      }
      return Promise.resolve();
    },
    [getEmailDuplication]
  );

  const validatePasswordCheck = useCallback(
    (_: unknown, value: string) => {
      const password = form.getFieldValue("password");
      if (value && value !== password) {
        return Promise.reject(new Error("비밀번호가 일치하지 않습니다."));
      }
      return Promise.resolve();
    },
    [form]
  );

  const goToLogin = () => {
    navigate("/", { replace: true });
  };

  return (
    <div css={styles.container}>
      <Button
        style={{ position: "absolute", top: 10, left: 10 }}
        shape="round"
        icon={<LeftOutlined />}
        onClick={goToLogin}
      >
        뒤로가기
      </Button>
      <Typography.Title level={1}>회원가입</Typography.Title>
      <Form form={form} onFinish={handleRegister}>
        <div css={styles.inputBox}>
          <Form.Item
            validateDebounce={300}
            name="email"
            style={{ width: "100%", marginBottom: 0 }}
            rules={[
              { required: true, message: "이메일을 입력해주세요!" },
              {
                type: "email",
                message: "유효하지 않은 이메일입니다!",
              },
              {
                validator: validateEmailDuplication,
                validateTrigger: "onChange",
                message: "이미 존재하는 이메일입니다.",
              },
            ]}
            hasFeedback
          >
            <Input
              size="large"
              placeholder="이메일"
              prefix={<MailOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="name"
            style={{ width: "100%", marginBottom: 0 }}
            rules={[
              { required: true, message: "이름을 입력해주세요!" },
              { min: 2, message: "이름은 최소 2자 이상이어야 합니다." },
              { max: 10, message: "이름은 최대 10자까지 가능합니다." },
            ]}
            hasFeedback
          >
            <Input size="large" placeholder="이름" prefix={<UserOutlined />} />
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
          <Form.Item
            dependencies={["password"]}
            name="passwordCheck"
            style={{ width: "100%", marginBottom: 0 }}
            rules={[
              { required: true, message: "비밀번호를 다시 입력해주세요!" },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                  "비밀번호는 최소 8자 이상, 하나의 문자와 숫자를 포함해야 합니다.",
              },
              {
                validator: validatePasswordCheck,
                validateTrigger: "onChange",
                message: "비밀번호가 일치하지 않습니다.",
              },
            ]}
            hasFeedback
          >
            <Input
              size="large"
              placeholder="비밀번호 확인"
              prefix={<KeyOutlined />}
              type="password"
            />
          </Form.Item>
          <Form.Item
            style={{ width: "100%", marginBottom: 0 }}
            shouldUpdate
            dependencies={["email", "password", "passwordCheck", "name"]}
          >
            {({ getFieldsError, getFieldsValue }) => {
              const hasError = getFieldsError().some(
                ({ errors }) => errors.length
              );
              const values = getFieldsValue();
              const isEmpty = !values.email || !values.password || !values.name;
              const isValid = hasError || isEmpty;
              return (
                <GradientButton
                  loading={loading}
                  text="회원가입"
                  htmlType="submit"
                  disabled={isValid}
                />
              );
            }}
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

function useStyle() {
  return {
    container: css({
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    }),
    inputBox: css({
      width: "300px",
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      padding: "10px",
    }),
  };
}

export default Register;
