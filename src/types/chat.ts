export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

export interface ChatScreenProps {
  messages: ChatMessage[];
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}
