import { storageConstants } from "@/types";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";

// const config: AxiosRequestConfig = { baseURL: "" };

export const instance = axios.create();

// Request interceptor
const interceptorRequestFulfilled = (config: AxiosRequestConfig) => {
  let TOKEN =
    typeof window !== "undefined"
      ? localStorage.getItem(storageConstants.accessToken)
      : "";
  if (TOKEN) {
    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      } as AxiosRequestHeaders,
    };
  } else {
    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
      } as AxiosRequestHeaders,
    };
  }
};

instance.interceptors.request.use(interceptorRequestFulfilled);

// Response interceptor
const responseInterceptorFulfilled = (res: AxiosResponse) => {
  if (200 <= res.status && res.status < 300) return res;

  return Promise.reject(...res.data);
};

const responseInterceptorRejected = async (error: any) => {
  console.log("47error", error);

  const config: AxiosRequestConfig = {};
  if (error.response.status === 403) {
    const originalRequest = config;

    try {
      const refreshToken = window.localStorage.getItem(
        storageConstants.refreshToken
      );
      let token = localStorage.getItem(storageConstants.accessToken);
      console.log("refreshToken", refreshToken, "token", token);
      const data = await axios
        .post(
          `/api/member/reissue`,
          {},
          {
            headers: {
              withCredentials: true,
              RefreshToken: refreshToken,
            },
          }
        )
        .then((res: any) => {
          console.log("71", res);
          return res.data;
        });

      console.log("403 error data", data);

      // const newAccessToken = data.tokens.accessToken;
      // const newRefreshToken = data.tokens.refreshToken;

      // console.log(newAccessToken, newRefreshToken);

      // originalRequest.headers = {
      //   "Content-Type": "application/json",
      //   Authorization: "Bearer " + newAccessToken,
      // };

      // localStorage.setItem(storageConstants.accessToken, newAccessToken);
      // localStorage.setItem(storageConstants.refreshToken, newRefreshToken);

      return await axios(originalRequest);
    } catch (err) {
      new Error("error");
    }
  }
  // // const errorStatus = error.response?.status;
  // // const errorUrl = error.response?.config.url;
  // // console.log(error.response);
  // // alert(errorMsg);
  // // if (window.confirm(errorMsg) === true) {
  // //  setTimeout(() => window.location.replace("/"), 500);
  // // }
  // // return new Error(error.response?.data?.message ?? error);
  return Promise.reject(error);
};

// instance.interceptors.response.use(
//   responseInterceptorFulfilled,
//   responseInterceptorRejected
// );

instance.interceptors.response.use(
  (res) => {
    if (200 <= res.status && res.status < 300) return res;

    return Promise.reject(...res.data);
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    const originalRequest = config;

    if (status === 403) {
      try {
        const accessToken =
          typeof window !== "undefined"
            ? localStorage.getItem(storageConstants.accessToken)
            : "";
        const refreshToken =
          typeof window !== "undefined"
            ? localStorage.getItem(storageConstants.refreshToken)
            : "";
        console.log("tokens", accessToken, refreshToken);
        const data = await axios
          .post(
            `/api/member/reissue`,
            {},
            {
              headers: {
                withCredentials: true,
                RefreshToken: refreshToken,
              },
            }
          )
          .then((res: any) => {
            console.log("71", res);
            return res.data;
          });
        console.log("token", data.tokens);
        const newAccessToken = data.tokens.accessToken;
        const newRefreshToken = data.tokens.refreshToken;

        originalRequest.headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + newAccessToken,
        };

        localStorage.setItem(storageConstants.accessToken, newAccessToken);
        localStorage.setItem(storageConstants.refreshToken, newRefreshToken);

        return await axios(originalRequest);
      } catch (err) {
        new Error(error);
      }
    }
    return Promise.reject(error);
  }
);

export function get<T>(...args: Parameters<typeof instance.get>) {
  return instance.get<T, T>(...args);
}

export function post<T>(...args: Parameters<typeof instance.post>) {
  return instance.post<T, T>(...args);
}

export function put<T>(...args: Parameters<typeof instance.put>) {
  return instance.put<T, T>(...args);
}

export function del<T>(...args: Parameters<typeof instance.delete>) {
  return instance.delete<T, T>(...args);
}
