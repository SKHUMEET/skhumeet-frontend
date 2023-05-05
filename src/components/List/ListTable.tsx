import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import ListItem from "@/components/List/ListItem";
import ListCardItem from "@/components/List/ListCardItem";
import { Category } from "@/types";

export interface ListProps {
  category: Category;
  list: any[];
  itemStyle?: "list" | "card";
}

export default function ListTable({
  category,
  list,
  itemStyle = "list", //기본이 리스트
}: ListProps) {
  const router = useRouter();

  const handleClickListItem = (id: number) => {
    router.push(`/${category}/${id}`); //디테일페이지
  };

  return (
    <ListContainer>
      <ListContainer2 itemStyle={itemStyle}>
        {list.length === 0 ? (
          <div style={{ marginTop: "1rem" }}>아직 게시글이 없습니다.</div>
        ) : (
          list.map((el, idx) => (
            <ListWrapper
              key={el.id}
              onClick={() => handleClickListItem(el.id)}
              itemStyle={itemStyle}
            >
              {itemStyle === "list" ? (
                <ListItem
                  item={el}
                  //  북마크,댓글개수,제목,현황,마감일,작성자
                />
              ) : (
                <ListCardItem
                  item={el}
                  // 북마크,이미지,댓글개수,제목,현황,마감일,작성자, 이미지 없으면 글
                />
              )}
            </ListWrapper>
          ))
        )}
      </ListContainer2>
    </ListContainer>
  );
}

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const ListContainer2 = styled.div<{ itemStyle: "list" | "card" }>`
  ${(props) =>
    props.itemStyle === "list"
      ? css``
      : css`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        `};

  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    ${(props) =>
      props.itemStyle === "card" &&
      css`
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      `};
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    ${(props) =>
      props.itemStyle === "card" &&
      css`
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 20px;
      `};
  }
`;

export const ListWrapper = styled.div<{ itemStyle: "list" | "card" }>`
  ${(props) =>
    props.itemStyle === "list"
      ? css`
          width: 100%;
        `
      : css`
          /* grid-template-rows: repeat(3fr); */
          :hover {
            transform: translateY(-5px);
            /* transform: scale(1.05); */
          }
        `};

  padding-top: 1rem;

  border: none;

  align-content: center;
  transition: all 0.3s ease-in-out;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  cursor: default;

  transition: 0.3s;
`;
