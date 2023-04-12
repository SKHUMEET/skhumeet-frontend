import {
  ConvertKorean,
  MAIN,
  MAINREQUEST,
  Status,
  categoryList,
  statusList as originStatusList,
} from "@/types";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DropDown from "../utils/DropDown";
import Link from "next/link";
import Btn from "../utils/Btn";
import { Category } from "@/types";
import TextEditor from "../TextEditor";
import imageUpload from "@/hooks/firebase/imageUpload";
import { usePostMainCategory } from "@/hooks/main";
import customAlert from "../modal/CustomModalAlert";
import { useRouter } from "next/router";

interface RegisterFormProps {
  category: Category;
  kind: "register" | "edit";
  type?: "list" | "grid";
  isEdit?: boolean;
  data?: MAIN;
}

const RegisterForm = ({
  category: defaultCategory,
  kind,
  type = "list",
  isEdit,
  data,
}: RegisterFormProps) => {
  const postMain = usePostMainCategory();
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const [registerType, setRegisterType] = useState(type);

  const initForm = {
    title: data?.title ?? "",
    category: data?.category ?? defaultCategory,
    contact: data?.contact ?? "",
    status: data?.status ?? originStatusList[0],
    endDate:
      data?.endDate.split("T")[0] ?? new Date().toISOString().split("T")[0],
    view: data?.view ?? 1,
    context: data?.context ?? "",
    images: data?.images ?? [],
  };

  const [form, setForm] = useState<MAINREQUEST>(initForm);

  const { title, category, contact, status, endDate, view, context, images } =
    form;

  const editStatusList: Partial<Status>[] = originStatusList.filter((el) =>
    el.startsWith("recruiting")
  );

  const handleChangeDropDown = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm({ ...form, [name]: value });
  };
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      await imageUpload(e.target.files).then((res) => {
        setForm({ ...form, images: [...images, ...res] });
        if (res) {
          customAlert("이미지 업로드 완료");
          const imgElement = document.createElement("img");
          imgElement.setAttribute("src", res);
          imgElement.setAttribute("width", "200");
          imgElement.setAttribute("height", "200");
          contentRef.current?.appendChild(imgElement);
        }
      });
    }
  };

  const handleSubmit = async () => {
    setForm({ ...form, context: contentRef.current?.innerHTML ?? "" });

    postMain({
      title,
      category,
      contact,
      status,
      endDate,
      view,
      context,
      images,
    });

    router.push(`/${category}`);
  };

  useEffect(() => {
    const registerStyle =
      category === "department_event" || category === "club" ? "grid" : "list";
    setRegisterType(registerStyle);
  }, [category]);

  return (
    <RegisterFormContainer>
      <RegisterHeader>
        <DropDown
          name="category"
          list={categoryList}
          onChange={handleChangeDropDown}
          defaultItem={defaultCategory}
        />
        {kind === "register" && registerType === "list" && (
          <span>{ConvertKorean[status]}</span>
        )}
        {kind === "edit" && registerType === "list" && (
          <DropDown
            name="status"
            list={editStatusList}
            onChange={handleChangeDropDown}
          />
        )}
        {kind === "register" && registerType === "grid" && (
          <DropDown
            name="status"
            list={originStatusList.filter(
              (el) => el !== "recruitment_deadline"
            )}
            onChange={handleChangeDropDown}
          />
        )}
        {kind === "edit" && registerType === "grid" && (
          <DropDown
            name="status"
            list={originStatusList}
            onChange={handleChangeDropDown}
          />
        )}
        <br />
        마감일
        <DateInput
          name="endDate"
          value={endDate}
          type="date"
          onChange={handleChange}
        />
        <br />
        <TitleInput
          name="contact"
          value={contact}
          onChange={handleChange}
          placeholder="오픈채팅 링크 or 전화번호"
        ></TitleInput>
      </RegisterHeader>
      <RegisterBody>
        <FormContainer>
          <TitleInput
            name="title"
            value={title}
            type="text"
            placeholder="제목을 입력해 주세요"
            onChange={handleChange}
          />

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
        <Btn onClick={handleSubmit}>작성하기</Btn>
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
