import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface DropDownProps {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  list: string[];
}
const DropDown = ({ list, onChange }: DropDownProps) => {
  return (
    <DropDownSelect onChange={onChange} defaultValue={list[0]}>
      {list.map((el) => (
        <DropDownOption value={el} key={el}>
          {el}
        </DropDownOption>
      ))}
    </DropDownSelect>
  );
};

export default DropDown;

const DropDownSelect = styled.select``;
const DropDownOption = styled.option``;
