import { useSuspenseQuery } from "@tanstack/react-query";
import { channelManagementApi } from "@api/channel-management";

export const useChannelsGetQuery = (key: string) => {
  return useSuspenseQuery({
    queryKey: [key || "channels"],
    queryFn: () => channelManagementApi.channels.get(),
  });
};
