import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface DropDownProps {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  list: string[];
  defaultItem?: string;
}
const DropDown = ({ list, onChange, defaultItem }: DropDownProps) => {
  return (
    <DropDownSelect onChange={onChange} defaultValue={defaultItem ?? list[0]}>
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
