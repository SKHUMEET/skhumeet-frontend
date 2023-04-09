import { CategoryProps, categoryList } from "@/types";
import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import DropDown from "../utils/DropDown";

const RegisterForm = ({ category: defaultCategory }: CategoryProps) => {
  const registerStyle =
    defaultCategory === "departmentEvent" || defaultCategory === "club"
      ? "line"
      : "multiplex";

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    // setCategory(e.target.value);
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
      </RegisterHeader>
    </RegisterFormContainer>
  );
};

export default RegisterForm;

const RegisterFormContainer = styled.div``;

const RegisterHeader = styled.div``;
