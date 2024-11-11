import { useRef, useState } from "react";
import { userManagementApi } from "@src/api/user-management/index.api";
import { pushToast } from "@src/shared/toast/toast";
import { useTypedNavigate } from "@src/route/useTypedNavigate";
import { RoutePath } from "@src/route/route.type";

const useRegister = () => {
  const navigate = useTypedNavigate();
  const [loading, setLoading] = useState(false);
  const [emailDuplication, setEmailDuplication] = useState(false);
  const emailAuthExpireTimer = useRef<NodeJS.Timeout>();
  const [emailAuthLoading, setEmailAuthLoading] = useState(false);
  const [emailAuthExpireTimeMils, setEmailAuthExpireTimeMils] = useState(0);
  const [verificationToken, setVerificationToken] = useState<string | null>(
    null
  );

  async function getEmailDuplication(email: string) {
    setLoading(true);
    const response = await userManagementApi.emailDuplication.post({
      email,
    });
    setLoading(false);
    const duplicated = response.data.isDuplicated;
    setEmailDuplication(duplicated);
    return duplicated;
  }

  async function sendEmailAuthentication(email: string) {
    setEmailAuthLoading(true);
    const { status, data } = await userManagementApi.emailAuthentication.post({
      email,
    });
    setEmailAuthLoading(false);
    if (status === 200) {
      pushToast({
        type: "success",
        message: "인증 메일이 발송되었습니다.",
      });
      activateTimer(data.expireTime);
    }
  }

  async function sendEmailVerification(email: string, code: string) {
    const {
      status,
      data,
      code: errorCode,
    } = await userManagementApi.emailVerification.post({
      email,
      code,
    });
    if (status === 200) {
      pushToast({
        type: "success",
        message: "인증이 완료되었습니다.",
      });
      setVerificationToken(data.verificationToken);
    }
    console.log(status, code);
    if (status === 400 && errorCode === "S01007") {
      console.log("clearTimer");
      clearTimer();
    }
  }

  async function register(values: {
    email: string;
    name: string;
    password: string;
    verificationToken: string;
  }) {
    setLoading(true);
    const { status, message } = await userManagementApi.signup.post(values);
    if (status === 200) {
      navigate(RoutePath.LOGIN, { replace: true });
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
  }

  function activateTimer(time: number) {
    setEmailAuthExpireTimeMils(time);
    emailAuthExpireTimer.current = setInterval(() => {
      setEmailAuthExpireTimeMils((prev) => {
        if (prev === 0) {
          clearInterval(emailAuthExpireTimer.current);
          emailAuthExpireTimer.current = undefined;
        }
        return Math.max(prev - 1000, 0);
      });
    }, 1000);
  }

  function clearTimer() {
    if (emailAuthExpireTimer.current) {
      clearInterval(emailAuthExpireTimer.current);
      emailAuthExpireTimer.current = undefined;
      setEmailAuthExpireTimeMils(0);
    }
  }

  return {
    getEmailDuplication,
    emailDuplication,
    loading,
    register,
    sendEmailAuthentication,
    emailAuthLoading,
    emailAuthExpireTimeMils,
    verificationToken,
    sendEmailVerification,
  };
};

export default useRegister;
