import React, { useEffect, useState } from "react";
import { CategoryProps, ConvertKorean } from "@/types";

import styled from "styled-components";
import ListTable from "@/components/List/ListTable";

import Btn from "../utils/Btn";
import { useRouter } from "next/router";
import Pagination from "../Pagination";
import { useMainCategory } from "@/hooks/main";

const ListBody = ({ category }: CategoryProps) => {
  const router = useRouter();
  const listStyle =
    category === "department_event" || category === "club" ? "card" : "list";
  const { data, page, setPage } = useMainCategory(category);
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
            <SubmitBtn
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
            </SubmitBtn>
          </div>
        </ListBodyHeader>
        <ListTable
          category={category}
          list={data.content ?? []}
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
  padding-bottom: 1rem;

  border-bottom: 2px solid ${({ theme }) => theme.color.light};
  font-size: 1.5rem;
`;

const CategoryWrapper = styled.div`
  font-weight: 600;
`;

const SubmitBtn = styled(Btn)`
  background-color: ${({ theme }) => theme.color.background};
  border: 1px solid ${({ theme }) => theme.color.main};
  color: ${({ theme }) => theme.color.main};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.main};
    border: 1px solid ${({ theme }) => theme.color.main};
    color: ${({ theme }) => theme.color.text};
  }
`;
