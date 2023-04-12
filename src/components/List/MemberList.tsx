import { MAIN, User } from "@/types";
import React from "react";
import ListItem from "./ListItem";
import Pagination from "../Pagination";
import styled from "styled-components";

interface MemberListProps {
  user: User | null | undefined;
  list: MAIN[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
}
const MemberList = ({
  user,
  list,
  page,
  setPage,
  totalPage,
}: MemberListProps) => {
  return (
    <>
      <ListBodyContainer>
        <ListBodyHeader>{user?.name}님 환영합니다!</ListBodyHeader>
        {list.length === 0 ? (
          <div>아직 작성하신 글이 없군요!</div>
        ) : (
          list.map((el) => (
            <ListItem
              key={el.id}
              item={el}
              //  북마크,댓글개수,제목,현황,마감일,작성자
            />
          ))
        )}

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

export default MemberList;

const ListBodyContainer = styled.div`
  width: 100%;
`;

const ListBodyHeader = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  margin-top: 1rem;
`;
