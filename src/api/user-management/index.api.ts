import { emailDuplicationApi } from "@api/user-management/email-duplication";
import { signupApi } from "@api/user-management/signup";
import { signinApi } from "@api/user-management/signin";
import { reissueApi } from "./reissue";
import { emailAuthenticationApi } from "./email-authentication";
import { emailVerificationApi } from "./email-verification";

export const userManagementApi = {
  emailDuplication: emailDuplicationApi,
  emailAuthentication: emailAuthenticationApi,
  emailVerification: emailVerificationApi,
  signup: signupApi,
  signin: signinApi,
  reissue: reissueApi,
};
