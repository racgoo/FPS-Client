import { useSuspenseQuery } from "@tanstack/react-query";
import { userManagementApi } from "@api/user-management/index.api";

export const useEmailDuplicationPostQuery = (key: string) => {
  return useSuspenseQuery({
    queryKey: [key || "email-duplication"],
    queryFn: () => userManagementApi.emailDuplication.post(payload),
  });
};
