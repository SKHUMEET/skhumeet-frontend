import { useRouter } from "next/router";
import { post } from "@/libs/api";
import {
  setAccessToken,
  setRefreshToken,
  setStoredUser,
} from "../user-storage";
interface UseAuth {
  findMemeberById: (id: string) => Promise<any>;
  signup: (
    memberNumber: string,
    loginId: string,
    name: string,
    nickname: string,
    profileImage: string
  ) => Promise<any>;
}

export const useAuth = (): UseAuth => {
  const router = useRouter();
  const findMemeberById = async (id: string): Promise<any> => {
    const res = await post("/api/member/login", {
      loginId: id,
    }).then((res: any) => {
      console.log("authindex res", res);
      console.log(res.status);
      if (res.status === 200) {
        setAccessToken(res.data.tokens.accessToken);
        setRefreshToken(res.data.tokens.refreshToken);
        setStoredUser(res.data.data);
        alert(`${res.data.data.name}님 환영합니다`);
        location.href = "/";
      }
      return res;
    });
    return res;
  };
  const signup = async (
    memberNumber: string,
    loginId: string,
    name: string,
    nickname: string,
    profileImage: string
  ): Promise<any> => {
    await post("/api/member/join", {
      memberNumber,
      loginId,
      name,
      nickname,
      profileImage,
    }).then((res: any) => {
      console.log(res);
      setAccessToken(res.data.tokens.accessToken);
      setRefreshToken(res.data.tokens.refreshToken);
      setStoredUser(res.data.data);
      alert(`${res.data.data.name}님 환영합니다`);
      location.href = "/";
    });
  };
  return {
    findMemeberById,
    signup,
  };
};
