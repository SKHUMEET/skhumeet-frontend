import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { QueryKey } from "react-query";
import axios from "axios";
import { post, instance } from "@/libs/api";
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
    await instance
      .post("/api/member/login", {
        loginId: id,
      })
      .then((res: any) => {
        console.log("res", res);
        alert(`${res.data.name}님 환영합니다"`);
        router.push("/");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const signup = async (
    memberNumber: string,
    loginId: string,
    name: string,
    nickname: string,
    profileImage: string
  ): Promise<any> => {
    await instance
      .post("/api/member/join", {
        memberNumber,
        loginId,
        name,
        nickname,
        profileImage,
      })
      .then((res) => {
        console.log(res);
        alert(`${res.data.name}님 환영합니다"`);
        router.push("/");
        // return res.data;
      });
  };
  return {
    findMemeberById,
    signup,
  };
};
