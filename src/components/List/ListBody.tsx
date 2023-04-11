import React, { useEffect, useState } from "react";
import { CategoryProps, ConvertKorean } from "@/types";

import styled from "styled-components";
import ListTable from "@/components/List/ListTable";

import { Mockdata } from "@/mockData";
import Btn from "../utils/Btn";
import { useRouter } from "next/router";
import Pagination from "../Pagination";
import { useMainCategory } from "@/hooks/main";

const ListBody = ({ category }: CategoryProps) => {
  const router = useRouter();
  const listStyle =
    category === "departmentEvent" || category === "club" ? "card" : "list";
  const { data, page, setPage } = useMainCategory(category);
  // const [page, setPage] = useState<number>(1);
  console.log(data);
  const [totalPage, setTotalPage] = useState<number>(0);

  useEffect(() => {
    setTotalPage(data.totalPages);
  }, [data]);
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
          list={data.content ?? []}
          page={1}
          itemStyle={listStyle}
        />
        {totalPage > 1 && (
          <Pagination
            totalPages={totalPage}
            currentPage={page}
            onPageChange={setPage}
          ></Pagination>
        )}
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
