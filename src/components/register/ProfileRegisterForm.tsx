import React, { ChangeEvent, useState } from "react";
import { LoginUserProfileProps } from "@/pages/auth";
import styled from "styled-components";
import { useAuth } from "@/hooks/user";
import Btn from "../utils/Btn";

const ProfileRegisterForm = ({
  id,
  name = "",
  nickname,
  profile_image,
}: LoginUserProfileProps) => {
  console.log(id, name, nickname, profile_image);
  const { signup } = useAuth();
  const [nameForm, setNameForm] = useState<string>(name);
  const [studentIdForm, setStudentIdForm] = useState<string>("");
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNameForm(e.target.value);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStudentIdForm(e.target.value);
  };
  const handleSubmit = () => {
    console.log(id, nameForm, nickname, profile_image, studentIdForm);

    studentIdForm &&
      signup(studentIdForm, id, nameForm, nickname, profile_image).then(
        (res) => {
          if (res.status === 200) {
            setTimeout(() => window.location.replace("/"), 500);
          }
        }
      );

    // axios.post
  };
  return (
    <Container>
      <Wrapper>
        <div>
          <h3 style={{ marginBottom: "10px" }}>
            SKHUMEET에 오신 것을 환영합니다!
          </h3>
          <h4>
            <H4Wrapper>
              성공회대 학생(교수)임을 <mark>인증</mark>하기 위해{" "}
            </H4Wrapper>
            <mark>이름과 학번(사번)</mark>을 입력해주세요!
          </h4>
        </div>
        <div style={{ width: "100%" }}>
          <div>
            <InputSpan>이름 </InputSpan>
            <Input
              value={nameForm}
              onChange={handleChangeName}
              // placeholder="학번을 입력해주세요"
            />
          </div>
          <StudentNumContainer>
            <InputSpan>학번 </InputSpan>
            <Input
              value={studentIdForm}
              onChange={handleChange}
              // placeholder="학번을 입력해주세요"
            />
          </StudentNumContainer>
        </div>
        <Btn onClick={handleSubmit}>입력</Btn>
      </Wrapper>
    </Container>
  );
};

export default ProfileRegisterForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  width: 50%;
  height: 63%;

  background-color: ${({ theme }) => theme.color.background};
  /* border: 3px solid ${({ theme }) => theme.color.main}; */
  border-radius: 20px;

  text-align: center;

  cursor: default;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    width: 73%;
    height: 30%;
  }

  > div > h3 {
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
      font-size: 80%;
    }
  }

  > div > h4 {
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
      font-size: 60%;
    }
  }
`;

const H4Wrapper = styled.div`
  display: inline-block;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    display: block;
  }
`;

const Input = styled.input`
  width: 50%;
  height: 35px;
  margin-left: 10px;

  border: 1px solid ${({ theme }) => theme.color.main};
  border-radius: 3px;

  outline: none;

  :focus {
    border: 2px solid ${({ theme }) => theme.color.main};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    height: 20px;
  }
`;

const StudentNumContainer = styled.div`
  margin-top: 1rem;
`;

const InputSpan = styled.span`
  font-weight: bold;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    font-size: 80%;
  }
`;
