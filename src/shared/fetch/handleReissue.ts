import axios, { AxiosResponse } from "axios";

import { userManagementApi } from "@api/user-management/index.api";
import { pushToast } from "@src/shared/toast/toast";

export const handleReissue = async (response: AxiosResponse) => {
  const { status: reissueStatus } = await userManagementApi.reissue.get();
  if (reissueStatus === 200) {
    const originalRequest = response.config;
    return await axios(originalRequest);
  }
  pushToast({
    type: "error",
    message: "로그인 정보가 만료되었습니다.\n다시 로그인 해주세요.",
  });
  window.location.replace("/");
};
