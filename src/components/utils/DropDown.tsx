import { Category, ConvertKorean, Status } from "@/types";
import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface DropDownProps {
  name: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  list: Category[] | Status[];

  defaultItem?: string;
}

const DropDown = ({ name, list, onChange, defaultItem }: DropDownProps) => {
  return (
    <DropDownSelect
      name={name}
      onChange={onChange}
      defaultValue={defaultItem ?? list[0]}
    >
      {list.map((el: Category | Status) => (
        <DropDownOption value={el} key={el}>
          {ConvertKorean[el]}
        </DropDownOption>
      ))}
    </DropDownSelect>
  );
};

export default DropDown;

const DropDownSelect = styled.select`
  margin-right: 1rem;
  margin-bottom: 1rem;
  outline: none;
`;

const DropDownOption = styled.option``;
