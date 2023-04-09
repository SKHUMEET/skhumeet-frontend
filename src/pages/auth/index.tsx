import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfileRegisterForm from "@/components/register/ProfileRegisterForm";
import { useAuth } from "@/hooks/user";
import { Modal } from "@/components/modal";

export interface LoginUserProfileProps {
  id: string;
  name: string;
  nickname: string;
  profile_image: string;
}

export let naverLogin: any;
const Auth = () => {
  const { findMemeberById } = useAuth();
  const [isProfileRegister, setIsProfileRegister] = useState(false);
  const [form, setForm] = useState({
    id: "",
    name: "",
    nickname: "",
    profile_image: "",
  });
  
  useEffect(() => {
    const naver = (window as any).naver;

    // new URL(document.referrer).searchParams.get("redirect_uri")
    const login = () => {
      naverLogin = new naver.LoginWithNaverId({
        clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID, // ClientID
        callbackUrl: "http://localhost:3000/auth", // Callback URL
        isPopup: false, // 팝업 형태로 인증 여부
        loginButton: {
          color: "green", // 색상
          type: 3, // 버튼 크기
          height: "40", // 버튼 높이
        }, // 로그인 버튼 설정
      });

      naverLogin.init();
    };

    const getToken = async () => {
      naverLogin.getLoginStatus(async (status: boolean) => {
        console.log(status);
        console.log(naverLogin.user);

        if (status && naverLogin.user) {
          const id = naverLogin.user.getId() as string;
          const name = naverLogin.user.getName() as string;
          const nickname = naverLogin.user.getNickName() as string;
          const profile_image = naverLogin.user.getProfileImage() as string;

          await findMemeberById(id).then((res) => {
            console.log(res);
            res.status === 404 && setIsProfileRegister(true);
          });

          setForm({ ...form, id, name, nickname, profile_image });
        }
      });
      // const hash = Router.asPath.split("#")[1]; // 네이버 로그인을 통해 전달받은 hash 값
      // if (hash) {
      //   const token = hash.split("=")[1].split("&")[0]; // token값 확인
      //   naverLogin.getLoginStatus((status: boolean) => {
      //     if (status) {
      //       Router.push(
      //         {
      //           pathname: "/auth/profileRegister",
      //           query: {
      //             token: token,
      //           },
      //         },
      //         "/auth/profileRegister"
      //       );

      //       // if (
      //       //   naverLogin.user.getId() &&
      //       //   naverLogin.user.getName() &&
      //       //   naverLogin.user.getNickName() &&
      //       //   naverLogin.user.getProfileImage()
      //       // ) {
      //       //   const id = naverLogin.user.getId() as string;
      //       //   const name = naverLogin.user.getName() as string;
      //       //   const nickname = naverLogin.user.getNickName() as string;
      //       //   const profile_image = naverLogin.user.getProfileImage() as string;

      //       //   naverLogin.reprompt(); // 정보제공창 다시 보여주기
      //     }
      //   });
      // }
    };

    login();
    getToken();
  }, []);

  return (
    <>
      <Wrapper>
        <Header.Container>
          <Header.Title>로그인할 방법을 선택해주세요.</Header.Title>
        </Header.Container>
        <Button.Container>
          <Button.ButtonList>
            <Button.NaverButton id="naverIdLogin" />
          </Button.ButtonList>
        </Button.Container>
      </Wrapper>
      <Modal show={isProfileRegister} onClose={() => {}}>
        <ProfileRegisterForm
          id={form.id}
          name={form.name}
          nickname={form.nickname}
          profile_image={form.profile_image}
        />
      </Modal>
    </>
  );
};

export default Auth;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  position: fixed;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  overflow: auto;
  background-color: ${({ theme }) => theme.color.background};
`;

const Header = {
  Container: styled.div`
    text-align: center;
  `,

  Title: styled.h2``,
};

const Button = {
  Container: styled.div``,

  ButtonList: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  NaverButton: styled.div``,
};
