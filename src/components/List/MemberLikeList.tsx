import { del } from "@/libs/api";
import React from "react";
import styled from "styled-components";
import customAlert from "@/components/modal/CustomModalAlert";
import { queryClient } from "@/react-query/queryClient";
import { useRouter } from "next/router";
import ListItem from "@/components/List/ListItem";
import { Category, User } from "@/types";
import Pagination from "@/components/Pagination";

interface MemberListProps {
  user: User | null | undefined;
  list: any[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
}

const MemberLikeList = ({
  user,
  list,
  page,
  setPage,
  totalPage,
}: MemberListProps) => {
  const handleBookmarkDelete = async (bookmarkId: number) => {
    await del(`/api/post/bookmark?bookmarkId=${bookmarkId}`).then((res) => {
      customAlert("북마크 생성");
      queryClient.clear();
      router.reload();
    });
  };
  const router = useRouter();
  const handleClickListItem = (category: Category, id: number) => {
    router.push(`/${category}/${id}`); //디테일페이지
  };

  return (
    <>
      <ListBodyContainer>
        <ListBodyHeader>{user?.name}님 환영합니다!</ListBodyHeader>
        {list.length === 0 ? (
          <div>아직 북마크 한 글이 없군요!</div>
        ) : (
          list.map((el) => (
            <>
              <div
                onClick={() =>
                  handleClickListItem(
                    el.post.category.toLowerCase() as Category,
                    el.post.id
                  )
                }
                key={el.post.id}
              >
                <ListItem
                  item={el.post}
                  //  북마크,댓글개수,제목,현황,마감일,작성자
                />
              </div>
              {/* <div onClick={() => handleBookmarkDelete(el.id)}>북마크 삭제</div> */}
            </>
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

export default MemberLikeList;

const ListBodyContainer = styled.div`
  width: 100%;
`;

const ListBodyHeader = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  margin-top: 1rem;
`;
