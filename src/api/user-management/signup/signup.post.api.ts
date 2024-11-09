import { fetchData } from "@src/shared/fetch/fetchData";
import { FetchMethod } from "@src/shared/fetch/constants";

type SignupPostApiPayload = {
  email: string;
  password: string;
  name: string;
  verificationToken: string;
};

type SignupPostApiResult = null;

export const signupPostApi = async (
  payload: SignupPostApiPayload
): Promise<Response<SignupPostApiResult>> => {
  return await fetchData({
    url: "user-management/signup",
    method: FetchMethod.POST,
    data: payload,
  });
};
