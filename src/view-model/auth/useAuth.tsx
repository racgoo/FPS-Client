import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { userManagementApi } from "@api/user-management/index.api";
import { pushToast } from "@src/shared/toast/toast";

const useAuth = () => {
  const navigate = useNavigate();
  const [loginLoading, setLoginLoading] = useState(false);
  const login = async (payload: { email: string; password: string }) => {
    setLoginLoading(true);
    const { status } = await userManagementApi.signin.post(payload);
    if (status === 200) {
      navigate("/home", { replace: true });
      pushToast({
        type: "success",
        message: "로그인 되었습니다.",
      });
    }
    setLoginLoading(false);
  };

  const reissue = async () => {
    const { status, message } = await userManagementApi.reissue.get();
    if (status !== 200) {
      pushToast({
        type: "error",
        message,
      });
      navigate("/", { replace: true });
    }
  };

  return { login, reissue, loading: loginLoading };
};

export default useAuth;
