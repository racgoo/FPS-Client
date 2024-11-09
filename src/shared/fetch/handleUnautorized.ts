import { sharedErrorCode } from "@src/api/commonError/sharedError.code";
import { clearStorage } from "../reset/clearStorage";
import axios, { AxiosResponse } from "axios";
import { pushToast } from "../toast/toast";
import { userManagementApi } from "@src/api/user-management/index.api";

export const handleUnauthorized = async (response: AxiosResponse) => {
  const { code } = response.data;
  if (code === sharedErrorCode.EXPIRED_ACCESS_TOKEN) {
    const { status: reissueStatus } = await reissueToken();
    if (reissueStatus === 200) {
      return await resendRequest(response);
    }
  }
  forceLogout();
};

const reissueToken = async () => {
  return await userManagementApi.reissue.get();
};

const resendRequest = async (response: AxiosResponse) => {
  const originalRequest = response.config;
  return await axios(originalRequest);
};

const forceLogout = () => {
  pushToast({
    type: "error",
    message: "로그인 정보가 만료되었습니다.\n다시 로그인 해주세요.",
  });
  clearStorage();
};
