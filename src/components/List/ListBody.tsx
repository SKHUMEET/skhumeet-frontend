import React from "react";
import { CategoryProps, ConvertKorean } from "@/types";

import styled from "styled-components";
import ListTable from "@/components/List/ListTable";

import { Mockdata } from "@/mockData";
import Btn from "../utils/Btn";
import { useRouter } from "next/router";

const ListBody = ({ category }: CategoryProps) => {
  const router = useRouter();
  const listStyle =
    category === "departmentEvent" || category === "club" ? "card" : "list";

  return (
    <>
      <ListBodyContainer>
        <ListBodyHeader>
          <CategoryWrapper>{ConvertKorean[category]}</CategoryWrapper>
          <div>
            <Btn
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
            </Btn>
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
  margin-top: 1rem;
`;

const CategoryWrapper = styled.div`
  margin-top: 1rem;

  font-weight: 600;
`;
