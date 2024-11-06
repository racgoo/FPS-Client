import { FetchMethod } from "@shared/fetch/constants";
import { fetchData } from "@src/shared/fetch/fetchData";

type ReissueGetApiResult = {
  refresh_token: string;
};

export const reissueGetApi = async (): Promise<
  Response<ReissueGetApiResult>
> => {
  return await fetchData({
    url: "user-management/reissue",
    method: FetchMethod.GET,
    skipErrorToast: true,
  });
};
