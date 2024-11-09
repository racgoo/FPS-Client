import useAuth from "@src/view-model/auth/useAuth";
import { useLayoutEffect } from "react";
import LoadingBox from "../loading/LoadingBox";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { initialLogin, initialLoading } = useAuth();

  useLayoutEffect(() => {
    initialLogin();
  }, []);

  return (
    <LoadingBox loading={initialLoading}>
      {initialLoading ? <></> : children}
    </LoadingBox>
  );
};

export default AuthProvider;
