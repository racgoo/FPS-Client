import { useState } from "react";
import { css } from "@emotion/react";
import { Input } from "antd";
import { colors } from "@style/constants/colors";
import { effects } from "@style/constants/effects";
import { sizes } from "@style/constants/sizes";
import { typography } from "@style/constants/typography";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div css={inputWrapperStyle}>
      <Input.TextArea
        css={inputStyle}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="메시지를 입력하세요..."
        autoSize={{ minRows: 1, maxRows: 4 }}
      />
    </div>
  );
};

const inputWrapperStyle = css`
  padding: ${sizes.spacing.md};
  background-color: ${colors.background.darker};
  border-top: 1px solid ${colors.border.primary};
`;

const inputStyle = css`
  background-color: ${colors.background.dark};
  border-color: ${colors.border.primary};
  border-radius: ${effects.borderRadius.md};
  color: ${colors.text.primary};
  font-size: ${typography.fontSizes.md};
  transition: ${effects.transition.default};

  &::placeholder {
    color: ${colors.text.disabled};
  }

  &:hover,
  &:focus {
    border-color: ${colors.primary.light};
    background-color: ${colors.background.darker};
    color: ${colors.text.primary};
  }

  &.ant-input {
    background-color: ${colors.background.dark};
    color: ${colors.text.primary};
  }

  &.ant-input:focus {
    background-color: ${colors.background.darker};
    color: ${colors.text.primary};
  }
`;

export default ChatInput;
