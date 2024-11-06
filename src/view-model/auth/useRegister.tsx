import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { userManagementApi } from "@src/api/user-management/index.api";
import { pushToast } from "@src/shared/toast/toast";

const useRegister = () => {
  const navigate = useNavigate();
  const [emailDuplication, setEmailDuplication] = useState(false);
  const [loading, setLoading] = useState(false);

  const getEmailDuplication = async (email: string) => {
    setLoading(true);
    const response = await userManagementApi.emailDuplication.post({
      email,
    });
    setLoading(false);
    const duplicated = response.data.isDuplicated;
    setEmailDuplication(duplicated);
    return duplicated;
  };

  const register = async (values: {
    email: string;
    name: string;
    password: string;
  }) => {
    setLoading(true);
    const { status, message } = await userManagementApi.signup.post(values);
    if (status === 200) {
      navigate("/", { replace: true });
      pushToast({
        type: "success",
        message: `${values.name}님,\n회원가입이 완료되었습니다.`,
      });
    } else {
      pushToast({
        type: "error",
        message,
      });
    }
    setLoading(false);
  };

  return {
    getEmailDuplication,
    emailDuplication,
    loading,
    register,
  };
};

export default useRegister;
