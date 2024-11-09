import { fetchData } from "@src/shared/fetch/fetchData";
import { FetchMethod } from "@src/shared/fetch/constants";

type SigninPostApiPayload = {
  email: string;
  password: string;
};

type SigninPostApiResult = Record<string, unknown>;

export const signinPostApi = async (
  payload: SigninPostApiPayload
): Promise<Response<SigninPostApiResult>> => {
  return await fetchData({
    url: "user-management/signin",
    method: FetchMethod.POST,
    data: payload,
    skipErrorToast: false,
  });
};
