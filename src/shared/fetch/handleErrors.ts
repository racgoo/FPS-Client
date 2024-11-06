import { pushToast } from "../toast/toast";
import { AxiosResponse } from "axios";

export const handleErrors = (response: AxiosResponse) => {
  const { message } = response.data;
  pushToast({
    type: "error",
    message: message,
  });
};
