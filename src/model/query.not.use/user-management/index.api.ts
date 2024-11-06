import { useEmailDuplicationQuery } from "@src/model/query.not.use/user-management/email-duplication";
import { useSignupQuery } from "@src/model/query.not.use/user-management/signup";
import { useSigninQuery } from "@src/model/query.not.use/user-management/signin";

export const userManagementQuery = {
  emailDuplication: useEmailDuplicationQuery,
  signup: useSignupQuery,
  signin: useSigninQuery,
};
