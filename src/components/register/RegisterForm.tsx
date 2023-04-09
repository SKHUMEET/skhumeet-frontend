import {
  CategoryProps,
  categoryList,
  messageList,
  situationList,
} from "@/types";
import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import DropDown from "../utils/DropDown";
import Link from "next/link";
import Btn from "../Btn";

const RegisterForm = ({ category: defaultCategory }: CategoryProps) => {
  const registerStyle =
    defaultCategory === "departmentEvent" || defaultCategory === "club"
      ? "line"
      : "multiplex";

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    // setCategory(e.target.value);
  };

  const onChangeMessage = (e: ChangeEvent<HTMLSelectElement>) => {
    // setMessage(e.target.value);
  };

  const [form, setForm] = useState();

  return (
    <RegisterFormContainer>
      <RegisterHeader>
        <DropDown
          list={categoryList}
          onChange={onChangeCategory}
          defaultItem={defaultCategory}
        />
        <DropDown list={messageList} onChange={onChangeCategory} />
        <DropDown list={situationList} onChange={onChangeCategory} />
        <br />
          마감일
        <DateInput type="date" />
      </RegisterHeader>
      <RegisterBody>
        <FormContainer>
          <TitleInput type="text" placeholder="제목을 입력해 주세요" />
          <ContentInput placeholder="내용을 입력해 주세요" />
        </FormContainer>
      </RegisterBody>
      <BtnContainer>
        <Link href="/">
          <CancelBtn>취소</CancelBtn>
        </Link>
        <Btn onClick={() => SubmitEvent}>작성하기</Btn>
      </BtnContainer>
    </RegisterFormContainer>
  );
};

export default RegisterForm;

const RegisterFormContainer = styled.div``;

const RegisterHeader = styled.div`
  margin: 1rem 0;
`;

const RegisterBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 40vw;

  padding: 5px;
  border-top: 2px solid ${({ theme }) => theme.color.main};
  border-bottom: 2px solid ${({ theme }) => theme.color.main};

  > input,
  textarea {
    width: 100%;
    margin: 5px 0;
  }
`;

const DateInput = styled.input`
  margin-left: 10px;

  outline: none;
`

const TitleInput = styled.input`
  height: 2rem;
  padding-bottom: 5px;

  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.main};

  font-size: 1rem;
  outline: none;

  :focus {
    border-bottom: 2px solid ${({ theme }) => theme.color.main};
  }
`;

const ContentInput = styled.textarea`
  height: 50vh;

  border: none;
  text-align: left;

  outline: none;
`;

const BtnContainer = styled.div`
  width: 34.6%;
  float: right;
  padding: 0 5px;
`;

const CancelBtn = styled.button`
  width: 3rem;
  margin-top: 1rem;
  margin-right: 5px;
  padding: 2px 3px;

  background-color: #999999;

  color: white;
  border: 1px solid #999999;
  border-radius: 3px;

  text-align: center;

  :hover {
    background-color: white;
    color: #999999;
  }
`;
