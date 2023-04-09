import { Category, ConvertKorean, Message, Situation } from "@/types";
import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface DropDownProps {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  list: Category[] | Message[] | Situation[];
  defaultItem?: string;
}

const DropDown = ({ list, onChange, defaultItem }: DropDownProps) => {
  return (
    <DropDownSelect onChange={onChange} defaultValue={defaultItem ?? list[0]}>
      {list.map((el: Category | Message | Situation) => (
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
