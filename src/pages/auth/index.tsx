import React, { useState, useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
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
  const theme = useContext(ThemeContext);
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
      try {
        await new Promise((resolve) => {
          naverLogin.getLoginStatus((status: boolean) => {
            resolve(status);
          });
        });

        const id = naverLogin.user?.getId() as string;
        const name = naverLogin.user?.getName() as string;
        const nickname = naverLogin.user?.getNickName() as string;
        const profile_image = naverLogin.user?.getProfileImage() as string;

        const res = await findMemeberById(id);
        if (res.response?.status === 404) {
          setIsProfileRegister(true);
        }

        setForm({ ...form, id, name, nickname, profile_image });
      } catch (err) {
        console.error(err);
      }
      //   naverLogin.reprompt(); // 정보제공창 다시 보여주기
    };

    const initNaverLogin = async () => {
      login();
      await getToken();
    };

    initNaverLogin();
  }, []);

  const kakaoLogin = async () => {
    const kakao = (window as any).Kakao;
    // 카카오 초기화
    kakao.init(process.env.NEXT_PUBLIC_KAKAO);

    // 카카오 로그인 구현
    kakao.Auth.login({
      success: () => {
        kakao.API.request({
          url: "/v2/user/me", // 사용자 정보 가져오기
          success: async (res: any) => {
            // 로그인 성공할 경우 정보 확인 후 /kakao 페이지로 push
            console.log(res);
            await findMemeberById(res.id).then((res) => {
              console.log("res", res);
              res.response &&
                res.response.status === 404 &&
                setIsProfileRegister(true);
            });
            setForm({
              ...form,
              id: res.id,
              nickname: res.properties.nickname,
              profile_image: res.properties.profile_image,
            });
          },
          fail: (error: any) => {
            console.log(error);
          },
        });
      },
      fail: (error: any) => {
        console.log(error);
      },
    });
  };
  return (
    <>
      <Wrapper>
        <Container>
          <Header.Container>
            <LogoImg src="/Logooo.svg" alt="" />
            <Header.Title>함께 SKHUMEET 하려면?</Header.Title>
          </Header.Container>
          <Button.Container>
            <Button.ButtonList>
              <Button.NaverButton id="naverIdLogin" />
              <Button.KakaoButton
                src="/kakao_login_medium_narrow.png"
                onClick={kakaoLogin}
              />
            </Button.ButtonList>
          </Button.Container>
          <Mention>
            * 네이버는 개발 모드라 처음 가입한 아이디로만 로그인 되기 때문에(타
            아이디로 로그인 불가능) <mark>카카오</mark>로 로그인 하는 것을
            추천합니다!
          </Mention>
        </Container>
      </Wrapper>
      <Modal
        show={isProfileRegister}
        onClose={() => {}}
        backdropColor={theme.color.background}
      >
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  padding: 2rem 0;

  border: 2px solid ${({ theme }) => theme.color.main};
`;

const Header = {
  Container: styled.div`
    margin-bottom: 2rem;

    text-align: center;
  `,

  Title: styled.h2``,
};

const LogoImg = styled.img`
  width: 15vw;
  margin-bottom: 2rem;
`;

const Button = {
  Container: styled.div``,

  ButtonList: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  NaverButton: styled.div``,
  KakaoButton: styled.img`
    cursor: pointer;
  `,
  ButtonText: styled.h4`
    margin: 0;
    padding: 0;

    font-size: 18px;
    color: #ffffff;
  `,
};

const Mention = styled.p`
  margin-top: 2rem;

  font-size: 5px;
  text-align: center;
`;
