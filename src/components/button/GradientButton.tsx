import React from "react";
import { LoginOutlined } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";
import { createStyles } from "antd-style";

export enum GradientColor {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
}

const gradientMap: Record<GradientColor, [string, string]> = {
  [GradientColor.PRIMARY]: ["#6253e1", "#04befe"],
  [GradientColor.SECONDARY]: ["#ff7e5f", "#feb47b"],
  [GradientColor.TERTIARY]: ["#6a11cb", "#2575fc"],
};

const GradientButton: React.FC<{
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  loading: boolean;
  text: string;
  icon?: React.ReactNode;
  htmlType?: "button" | "submit" | "reset";
  disabled?: boolean;
  gradient?: GradientColor; // enum으로 그라데이션 색상 선택
}> = ({
  onClick,
  loading,
  text,
  icon,
  htmlType,
  disabled,
  gradient = GradientColor.PRIMARY,
}) => {
  // 기본값으로 PRIMARY 지정
  const { styles } = useStyle(gradient); // 선택된 색상에 따라 스타일 적용

  return (
    <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
    >
      <Button
        className={styles.button}
        type="primary"
        size="large"
        style={{ width: "100%", minWidth: "100%" }}
        icon={icon}
        onClick={onClick}
        loading={loading}
        htmlType={htmlType}
        disabled={disabled}
      >
        {text}
      </Button>
    </ConfigProvider>
  );
};

const useStyle = createStyles(({ prefixCls, css }, gradient: GradientColor) => {
  const gradientColors = gradientMap[gradient];
  return {
    linearGradientButton: css`
      &.${prefixCls}-btn-primary {
        border-width: 0;
        > span {
          position: relative;
        }
        &::before {
          content: "";
          background: linear-gradient(
            135deg,
            ${gradientColors[0]},
            ${gradientColors[1]}
          ); // props로 받은 색상 사용
          position: absolute;
          inset: 0;
          opacity: 1;
          transition: all 0.3s;
          border-radius: inherit;
        }

        &:hover:not([disabled])::before {
          opacity: 0.5; // 호버 시 색상이 바뀌지 않도록 수정
        }

        &[disabled] {
          background: none;
          opacity: 1;

          &::before {
            opacity: 0.5;
          }

          > span {
            opacity: 0.5;
          }
        }
      }
    `,

    button: css({
      width: "100%",
      minWidth: "100%",
    }),
  };
});

export default GradientButton;
