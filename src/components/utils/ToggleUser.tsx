import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import Image from "next/image";
import { get } from "@/libs/api";
import { User, storageConstants } from "@/types";

const ToggleUser = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [userImage, setUserImage] = useState<string>();

  const handleClick = (link: string, query?: string) => {
    if (query) {
      router.push({
        pathname: `/${link}/${query}`,
      });
    } else {
      router.push(`/${link}`);
    }

    setIsOpen(false);
  };

  const handleLogout = async () => {
    localStorage.clear();
    const res = await get("/oauth2.0/token", {
      params: {
        grant_type: "delete",
        client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID, // Client ID
        client_secret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET, // Client Secret
        access_token: router.query.token, // 발급된 Token 정보
        service_provider: "NAVER",
      },
    });

    if (res) {
      router.push("/auth"); // 로그인 페이지로 이동
    }
  };

  useEffect(() => {
    setIsOpen(false);
    const storedUser: User | null =
      (typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem(storageConstants.user) ?? "{}")) ??
      null;
    setUserImage(storedUser?.profileImage);
  }, []);

  return (
    <ToggleContainer onMouseLeave={() => setIsOpen(false)}>
      {userImage && (
        <ImageButton>
          <ProfileImage
            src={userImage as string}
            alt=""
            onMouseOver={() => setIsOpen(!isOpen)}
          />
        </ImageButton>
      )}
      {isOpen && (
        <ToggleDropDown.Content>
          <ToggleDropDown.Item onClick={() => handleClick("/mypage", "post")}>
            작성한 글 보기
          </ToggleDropDown.Item>
          <ToggleDropDown.Item onClick={() => handleClick("/mypage", "like")}>
            북마크 한 글 보기
          </ToggleDropDown.Item>
          <ToggleDropDown.Item onClick={() => handleClick("/mypage")}>
            마이페이지
          </ToggleDropDown.Item>
          <ToggleDropDown.Item onClick={handleLogout}>
            로그아웃
          </ToggleDropDown.Item>
        </ToggleDropDown.Content>
      )}
    </ToggleContainer>
  );
};

export default ToggleUser;

const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
`;

const ImageButton = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;

  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;

  overflow: hidden;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  object-fit: cover;
`;

const ToggleDropDown = {
  Content: styled.div`
    position: absolute;
    opacity: 1;
    width: 10rem;
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 100%;
    right: 0;

    background-color: ${({ theme }) => theme.color.background};

    border-radius: 20px;
    box-shadow: 0px 0px 5px -1.5px ${({ theme }) => theme.color.main};

    cursor: default;
  `,

  Item: styled.div`
    margin: 10px 0;

    transition: 0.2s;

    :hover {
      transform: translateY(-3px);
      opacity: 1;
    }
  `,
};
