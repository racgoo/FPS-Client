import {
  globalOpenNotification,
  NotificationConfig,
} from "@components/provider/AlertProvider";

export const pushToast = (config: NotificationConfig) => {
  if (globalOpenNotification) {
    globalOpenNotification(config);
  } else {
    console.warn("Notification system is not ready yet.");
  }
};
