import React, { useState, useEffect } from "react";
import { CategoryProps, CategoryKorean } from "@/types";

import styled from "styled-components";
import ListTable from "@/components/List/ListTable";

import { Mockdata } from "@/mockData";
import { useRouter } from "next/router";
const ListBody = ({ category }: CategoryProps) => {
  const router = useRouter();
  const listStyle =
    category === "departmentEvent" || category === "club" ? "card" : "list";

  return (
    <>
      <ListBodyContainer>
        <ListBodyHeader>
          <div>{CategoryKorean[category]}</div>
          <div>
            <button
              onClick={() =>
                router.push(
                  {
                    pathname: "/register",
                    query: { category: category },
                  },
                  "register"
                )
              }
            >
              작성하기
            </button>
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
