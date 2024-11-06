import { fetchData } from "@src/shared/fetch/fetchData";
import { FetchMethod } from "@src/shared/fetch/constants";

type EmailDuplicationPostApiPayload = {
  email: string;
};

type EmailDuplicationPostApiResult = {
  isDuplicated: boolean;
};

export const emailDuplicationPostApi = async (
  payload: EmailDuplicationPostApiPayload
): Promise<Response<EmailDuplicationPostApiResult>> => {
  return await fetchData({
    url: "user-management/email-duplication",
    method: FetchMethod.POST,
    data: payload,
    skipErrorToast: true,
  });
};
