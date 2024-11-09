import { NavigateOptions, useNavigate } from "react-router-dom";
import { RoutePath } from "./route.type";

export const useTypedNavigate = () => {
  const rawNavigate = useNavigate();
  const typedNavigate = (path: RoutePath, options?: NavigateOptions) => {
    return rawNavigate(path, options);
  };
  return typedNavigate;
};
