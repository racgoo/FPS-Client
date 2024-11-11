import { fetchData } from "@src/shared/fetch/fetchData";
import { FetchMethod } from "@src/shared/fetch/constants";

type EmailVerificationPostApiPayload = {
  email: string;
  code: string;
};

type EmailVerificationPostApiResult = {
  verificationToken: string;
};

export const emailVerificationPostApi = async (
  payload: EmailVerificationPostApiPayload
): Promise<Response<EmailVerificationPostApiResult>> => {
  return await fetchData({
    url: "user-management/email-verification",
    method: FetchMethod.POST,
    data: payload,
  });
};
