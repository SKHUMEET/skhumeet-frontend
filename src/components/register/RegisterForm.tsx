import {
  ConvertKorean,
  Situation,
  categoryList,
  messageList,
  situationList as originSituationList,
} from "@/types";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DropDown from "../utils/DropDown";
import Link from "next/link";
import Btn from "../utils/Btn";
import { Category } from "@/types";
import firebaseImageUpload from "@/hooks/firebase/imageUpload";
import TextEditor from "../TextEditor";

interface RegisterFormProps {
  category: Category;
  kind: "register" | "edit";
  type?: "list" | "grid";
}

const RegisterForm = ({
  category: defaultCategory,
  kind,
  type = "list",
}: RegisterFormProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<Category>(defaultCategory);
  const [registerType, setRegisterType] = useState(type);
  const editSituationList: Partial<Situation>[] = [
    "recruiting",
    "recruitmentCompleted",
  ];
  const [situation, setSituation] = useState<Situation>("recruiting");
  const [thumbImage, setThumbImage] = useState<string>();
  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value as Category);
  };

  const onChangeMessage = (e: ChangeEvent<HTMLSelectElement>) => {
    // setMessage(e.target.value);
  };

  const onChangeSituation = (e: ChangeEvent<HTMLSelectElement>) => {
    setSituation(e.target.value as Situation);
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      await firebaseImageUpload(e.target.files).then((res) => {
        if (!thumbImage) setThumbImage(res);
        console.log(res);
        if (res) {
          console.log("완료후", res);
          const imgElement = document.createElement("img");
          imgElement.setAttribute("src", res);
          imgElement.setAttribute("width", "100");
          imgElement.setAttribute("height", "100");
          contentRef.current?.appendChild(imgElement);
        }
      });
    }
  };

  useEffect(() => {
    const registerStyle =
      category === "departmentEvent" || category === "club" ? "grid" : "list";
    setRegisterType(registerStyle);
  }, [category]);

  return (
    <RegisterFormContainer>
      <RegisterHeader>
        <DropDown
          list={categoryList}
          onChange={onChangeCategory}
          defaultItem={defaultCategory}
        />
        <DropDown list={messageList} onChange={onChangeCategory} />
        {kind === "register" && registerType === "list" && (
          <span>{ConvertKorean[situation]}</span>
        )}
        {kind === "edit" && registerType === "list" && (
          <DropDown list={editSituationList} onChange={onChangeSituation} />
        )}
        {kind === "register" && registerType === "grid" && (
          <DropDown
            list={["recruiting", "promotion", "activity"]}
            onChange={onChangeSituation}
          />
        )}
        {kind === "edit" && registerType === "grid" && (
          <DropDown list={originSituationList} onChange={onChangeSituation} />
        )}
        <br />
        마감일
        <DateInput type="date" />
      </RegisterHeader>
      <RegisterBody>
        <FormContainer>
          <TitleInput type="text" placeholder="제목을 입력해 주세요" />

          {registerType === "list" ? (
            <ContentInput ref={contentRef} contentEditable={true} />
          ) : (
            <>
              <TextEditor
                editorRef={contentRef}
                handleFileUpload={handleFileUpload}
              />
            </>
          )}
        </FormContainer>
      </RegisterBody>
      <BtnContainer>
        <Link href="/">
          <Btn onClick={() => {}} color="#999999">
            취소
          </Btn>
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

  width: 100%;
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
`;

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

const ContentInput = styled.div`
  width: 100%;
  height: 50vh;

  overflow: auto;
  border: none;
  text-align: left;

  outline: none;
`;

const BtnContainer = styled.div`
  float: right;
`;
