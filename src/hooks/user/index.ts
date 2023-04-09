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
    await post("/api/member/login", {
      loginId: id,
    }).then((res: any) => {
      setAccessToken(res.tokens.accessToken);
      setRefreshToken(res.tokens.refreshToken);
      setStoredUser(res.data);
      alert(`${res.data.name}님 환영합니다`);
      router.push("/");
    });
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
      setAccessToken(res.tokens.accessToken);
      setRefreshToken(res.tokens.refreshToken);
      setStoredUser(res.data);
      alert(`${res.data.name}님 환영합니다`);
      router.push("/");
    });
  };
  return {
    findMemeberById,
    signup,
  };
};
