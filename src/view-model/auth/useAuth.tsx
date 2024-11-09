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
    return status === 200;
  };

  const initialLogin = async () => {
    const success = await reissue();
    if (success) {
      //로그인 성공
      console.log(getPathname() === RoutePath.LOGIN);
      if (getPathname() === RoutePath.LOGIN) {
        //로그인 페이지 접근시 Home으로 전환
        navigate(RoutePath.HOME, { replace: true });
      }
    } else {
      //로그인 실패
      if (!publicRoutes.includes(getPathname())) {
        //권한이 필요한 페이지 접근시 로그인 페이지로 전환
        navigate(RoutePath.LOGIN, { replace: true });
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
