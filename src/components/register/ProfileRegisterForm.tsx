import React, { ChangeEvent, useState } from "react";
import { LoginUserProfileProps } from "@/pages/auth";
import styled from "styled-components";
import { useAuth } from "@/hooks/user";

const ProfileRegisterForm = ({
  id,
  name,
  nickname,
  profile_image,
}: LoginUserProfileProps) => {
  const { signup } = useAuth();
  const [studentId, setStudentId] = useState<string>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStudentId(e.target.value);
  };
  const handleSubmit = () => {
    console.log(id, name, nickname, profile_image, studentId);

    studentId && signup(studentId, id, name, nickname, profile_image);

    // axios.post
  };
  return (
    <Container>
      <Wrapper>
        <div>
          <h3>{name}님 SKHUMEET에 오신 걸 환영합니다!</h3>
          <h3>성공회대 학생임을 인증하기 위해 학번을 입력해주세요!</h3>
        </div>
        <div style={{ width: "100%" }}>
          <span style={{ fontWeight: "bold" }}>학번 </span>
          <Input
            value={studentId}
            onChange={handleChange}
            // placeholder="학번을 입력해주세요"
          />
        </div>
        <button onClick={handleSubmit}>입력</button>
      </Wrapper>
    </Container>
  );
};

export default ProfileRegisterForm;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 50%;
  height: 50%;
  background-color: ${({ theme }) => theme.color.background};
  border: 3px solid ${({ theme }) => theme.color.main};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
`;

const Input = styled.input`
  height: 40px;
  width: 60%;
  border: 1px solid ${({ theme }) => theme.color.main};
  border-radius: 5px;
  margin-left: 10px;
  outline: none;
  :focus {
    border: 3px solid ${({ theme }) => theme.color.main};
  }
`;
