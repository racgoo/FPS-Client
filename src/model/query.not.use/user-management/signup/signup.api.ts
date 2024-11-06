import { useSuspenseQuery } from "@tanstack/react-query";
import { userManagementApi } from "@api/user-management/index.api";

export const useSignupPostQuery = (key: string) => {
  return useSuspenseQuery({
    queryKey: [key || "signup"],
    queryFn: () => userManagementApi.signup.post(),
  });
};
