import { notification } from "antd";
import React, { createContext, useLayoutEffect } from "react";

export type NotificationConfig = {
  type: "info" | "success" | "error" | "warning";
  message: string;
  description?: string;
};

export let globalOpenNotification:
  | ((config: NotificationConfig) => void)
  | null = null;

export const AlertContext = createContext<
  { openNotification: (config: NotificationConfig) => void } | undefined
>(undefined);

const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (config: NotificationConfig) => {
    api[config.type](config);
  };

  useLayoutEffect(() => {
    globalOpenNotification = openNotificationWithIcon;
    return () => {
      globalOpenNotification = null;
    };
  }, []);

  return (
    <AlertContext.Provider
      value={{ openNotification: openNotificationWithIcon }}
    >
      {contextHolder}
      {children}
    </AlertContext.Provider>
  );
};
export default AlertProvider;
