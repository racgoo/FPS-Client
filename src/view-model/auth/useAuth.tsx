import { useState } from "react";

import { userManagementApi } from "@api/user-management/index.api";
import { pushToast } from "@src/shared/toast/toast";
import { publicRoutes } from "@src/route/route.whitelist";
import { getPathname } from "@src/shared/helper/getPathname";
import { useTypedNavigate } from "@src/route/useTypedNavigate";
import { RoutePath } from "@src/route/route.type";

const useAuth = () => {
  const navigate = useTypedNavigate();
  const [loginLoading, setLoginLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const login = async (payload: { email: string; password: string }) => {
    setLoginLoading(true);
    const { status } = await userManagementApi.signin.post(payload);
    if (status === 200) {
      navigate(RoutePath.HOME, { replace: true });
      pushToast({
        type: "success",
        message: "로그인 되었습니다.",
      });
    }
    setLoginLoading(false);
  };

  const reissue = async () => {
    const { status } = await userManagementApi.reissue.get();
    if (status !== 200) {
      navigate(RoutePath.LOGIN, { replace: true });
      return false;
    }
    return true;
  };

  const initialLogin = async () => {
    if (!publicRoutes.includes(getPathname())) {
      const success = await reissue();
      if (success) {
        navigate(RoutePath.HOME, { replace: true });
      }
    }
    setInitialLoading(false);
  };

  return {
    login,
    reissue,
    loading: loginLoading,
    initialLoading,
    initialLogin,
  };
};

export default useAuth;
