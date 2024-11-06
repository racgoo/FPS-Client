import { emailDuplicationApi } from "@api/user-management/email-duplication";
import { signupApi } from "@api/user-management/signup";
import { signinApi } from "@api/user-management/signin";
import { reissueApi } from "./reissue";

export const userManagementApi = {
  emailDuplication: emailDuplicationApi,
  signup: signupApi,
  signin: signinApi,
  reissue: reissueApi,
};
