import React, { useState, useEffect } from "react";
import { CategoryProps, CategoryKorean } from "@/types";

import styled from "styled-components";
import ListTable from "@/components/List/ListTable";
import { Mockdata } from "@/mockData";
const ListBody = ({ category }: CategoryProps) => {
  const listStyle =
    category === "departmentEvent" || category === "club" ? "card" : "list";

  return (
    <>
      <ListBodyContainer>
        <ListBodyHeader>
          <div>{CategoryKorean[category]}</div>
          <div>
            <>작성하기</>
          </div>
        </ListBodyHeader>
        <ListTable
          category={category}
          list={Mockdata}
          page={1}
          itemStyle={listStyle}
        />
        {/* pagination */}
      </ListBodyContainer>
    </>
  );
};

export default ListBody;

const ListBodyContainer = styled.div`
  width: 100%;
`;
const ListBodyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
