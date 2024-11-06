import axios from "axios";
import { handleReissue } from "./handleReissue";
import { handleForbidden } from "./handleForbidden";
import { baseUrl, FetchMethod } from "./constants";
import { handleErrors } from "./handleErrors";

//CUSTOM FETCH FUNCTION
export const fetchData = async <T>({
  url,
  method,
  data,
  headers,
  skipErrorToast = false,
}: {
  url: string;
  method: keyof typeof FetchMethod;
  data?: T;
  headers?: Record<string, string>;
  skipErrorToast?: boolean;
}) => {
  const response = await axios.request({
    url: baseUrl + url,
    method: FetchMethod[method],
    data,
    headers: {
      ...headers,
    },
    withCredentials: true,
    skipErrorToast,
  });
  return response.data;
};

//ADD CUSTOM CONFIG TO AXIOS
declare module "axios" {
  export interface AxiosRequestConfig {
    skipErrorToast?: boolean;
  }
}

//REISSUE INTERCEPTOR ( GET NEW ACCESS,REFRESH TOKEN USING REFRESH TOKEN )
axios.interceptors.response.use(async (response) => {
  const { status } = response.data;
  //ERROR HANDLING
  switch (status) {
    case 401:
      await handleReissue(response);
      break;
    case 403:
      handleForbidden();
      break;
    default: {
      const needErrorToast = !response.config.skipErrorToast;
      if (needErrorToast) {
        handleErrors(response);
      }
    }
  }

  return response;
});
