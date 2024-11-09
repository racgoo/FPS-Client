import { fetchData } from "@src/shared/fetch/fetchData";
import { FetchMethod } from "@src/shared/fetch/constants";

type EmailAuthenticationPostApiPayload = {
  email: string;
};

type EmailAuthenticationPostApiResult = {
  expireTime: number;
};

export const emailAuthenticationPostApi = async (
  payload: EmailAuthenticationPostApiPayload
): Promise<Response<EmailAuthenticationPostApiResult>> => {
  return await fetchData({
    url: "user-management/email-authentication",
    method: FetchMethod.POST,
    data: payload,
  });
};
