import { Spin } from "antd";

const LoadingBox = ({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) => {
  return <Spin spinning={loading}>{children}</Spin>;
};

export default LoadingBox;
