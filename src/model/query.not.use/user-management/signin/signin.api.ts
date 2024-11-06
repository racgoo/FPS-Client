import { useSuspenseQuery } from "@tanstack/react-query";
import { userManagementApi } from "@api/user-management/index.api";

export const useSigninPostQuery = (key: string) => {
  return useSuspenseQuery({
    queryKey: [key || "signin"],
    queryFn: () => userManagementApi.signin.post(payload),
  });
};
