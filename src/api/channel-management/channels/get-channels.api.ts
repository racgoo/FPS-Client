import { fetchData } from "@src/shared/fetch/fetchData";
import { FetchMethod } from "@src/shared/fetch/constants";

type Channel = {
  id: string;
  ip: string;
};

type ChannelsGetApiResult = {
  channels: Channel[];
};

export const channelsGetApi = async (): Promise<ChannelsGetApiResult> => {
  return await fetchData({
    url: "channel-management/channels",
    method: FetchMethod.GET,
    skipErrorToast: true,
  });
};
