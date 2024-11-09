import useAuth from "@src/view-model/auth/useAuth";
import { useLayoutEffect } from "react";
import LoadingBox from "../loading/LoadingBox";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { initailLogin, initialLoading } = useAuth();

  useLayoutEffect(() => {
    initailLogin();
  }, []);

  return (
    <LoadingBox loading={initialLoading}>
      {initialLoading ? <></> : children}
    </LoadingBox>
  );
};

export default AuthProvider;
