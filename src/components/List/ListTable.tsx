import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import ListItem from "@/components/List/ListItem";
import ListCardItem from "@/components/List/ListCardItem";
import { Category } from "@/types";
interface ListProps {
  category: Category;
  list: any[];
  page: number;
  itemStyle?: "list" | "card";
}
export default function ListTable({
  category,
  list,
  page,
  itemStyle = "list", //기본이 리스트
}: ListProps) {
  const router = useRouter();
  const handleClickListItem = (id: number) => {
    router.push(``); //디테일페이지
  };

  return (
    <ListContainer>
      {list.map((el, idx) => (
        <ListWrapper
          key={(el.id, el.title, el.nickname, el.modifiedDate)}
          onClick={() => handleClickListItem(el.id)}
          itemStyle={itemStyle}
        >
          {itemStyle === "list" ? (
            <ListItem
            //  북마크,댓글개수,제목,현황,마감일,작성자
            />
          ) : (
            <ListCardItem
            // 북마크,이미지,댓글개수,제목,현황,마감일,작성자, 이미지 없으면 글
            />
          )}
        </ListWrapper>
      ))}
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

export const ListWrapper = styled.div<{ itemStyle: "list" | "card" }>`
  /* display: grid;
  ${(props) =>
    props.itemStyle === "list"
      ? css`
          grid-template-columns: 0.5fr 2fr 0.8fr 0.8fr;
        `
      : css`
          grid-template-rows: repeat(auto, 3fr);
        `}; */

  width: 100%;
  padding-left: 10px;
  padding-top: 20px;

  border: none;

  align-content: center;
  transition: all 0.3s ease-in-out;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  cursor: default;

  border-bottom: 1px solid #d3d3d3;

  :hover {
    color: ${({ theme }) => theme.color.main};
  }
`;
