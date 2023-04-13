import { User } from "@/types";
import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Btn from "../utils/Btn";
import imageUpload from "@/hooks/firebase/imageUpload";
import { instance } from "../../libs/api";
import { setStoredUser } from "@/hooks/user-storage";
import { useRouter } from "next/router";

const MyPageRegisterForm = ({ user }: { user: User | null | undefined }) => {
  const router = useRouter();
  const [profileImg, setProfileImg] = useState(user?.profileImage);

  useEffect(() => {
    setProfileImg(user?.profileImage);
  }, [user]);
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const res = await imageUpload(e.target.files).then((res) => {
        return res;
      });
      // console.log("20", res[0]);
      setProfileImg(res[0]);
      await instance
        .patch("/api/member", { profileImage: res[0] })
        .then((res) => {
          console.log(res.data);
          setStoredUser(res.data);
        });
      router.reload();
    }
  };

  return (
    <UserWrapper>
      <UserContainer>
        <LogoImg src="/Logo.svg" alt="" />
        <UserImg src={profileImg} alt="" />
        <label htmlFor="profileImgInput">
          <Button>이미지 수정하기</Button>
        </label>
        <input
          id="profileImgInput"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          hidden
        />
        <Info>
          {user?.name}님의 학적 정보: {user?.memberNumber}
        </Info>
      </UserContainer>
    </UserWrapper>
  );
};

export default MyPageRegisterForm;

const UserWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 70%;
  padding: 2rem 0;

  border: 2px solid ${({ theme }) => theme.color.main};
`;

const LogoImg = styled.img`
  width: 15vw;
  margin-bottom: 2rem;
`;

const UserImg = styled.img`
  width: 130px;
  height: 130px;
`;

const Button = styled.div`
  margin-top: 1rem;
  margin-left: 5px;
  padding: 2px 8px;

  background-color: ${({ theme, color }) => color ?? theme.color.main};
  color: white;
  border: 1px solid ${({ theme, color }) => color ?? theme.color.main};
  border-radius: 3px;

  text-align: center;

  :hover {
    background-color: white;
    color: ${({ theme, color }) => color ?? theme.color.main};
  }
`;

const Info = styled.div`
  margin-top: 1rem;
`;
