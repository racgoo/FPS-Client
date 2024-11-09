import { clearStorage } from "../reset/clearStorage";
import { pushToast } from "../toast/toast";

export const handleForbidden = () => {
  pushToast({
    type: "error",
    message: "권한이 없습니다.\n다시 로그인 해주세요.",
  });
  clearStorage();
};
