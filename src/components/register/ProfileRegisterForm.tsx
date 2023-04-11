import React, { ChangeEvent, useState } from "react";
import { LoginUserProfileProps } from "@/pages/auth";
import styled from "styled-components";
import { useAuth } from "@/hooks/user";

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
      signup(studentIdForm, id, nameForm, nickname, profile_image);

    // axios.post
  };
  return (
    <Container>
      <Wrapper>
        <div>
          <h3>SKHUMEET에 오신 걸 환영합니다!</h3>
          <h3>
            성공회대 학생(교수)임을 인증하기 위해 이름과 학번(사번)을
            입력해주세요!
          </h3>
        </div>
        <div style={{ width: "100%" }}>
          <div>
            <span style={{ fontWeight: "bold" }}>이름 </span>
            <Input
              value={nameForm}
              onChange={handleChangeName}
              // placeholder="학번을 입력해주세요"
            />
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>학번 </span>
            <Input
              value={studentIdForm}
              onChange={handleChange}
              // placeholder="학번을 입력해주세요"
            />
          </div>
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
