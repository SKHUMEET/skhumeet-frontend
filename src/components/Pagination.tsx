import { useState } from "react";
import styled from "styled-components";

interface PaginationData {
  totalPages: number;
  currentPage: number;
  // 페이지 번호 변경될 때 호출되는 함수
  onPageChange: (page: number) => void;
}

// PaginationData 속성 받아옴
const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationData) => {
  const pageSize = 9;

  const [currentGroup, setCurrentGroup] = useState(1);

  // 페이지 번호 변경될 때 호출
  const handlePageChange = (page: number) => {
    onPageChange(page);
    const group = Math.ceil(page / pageSize);
    setCurrentGroup(group);
  };

  // 이전 그룹 버튼 클릭 시 호출
  const handlePrevClick = () => {
    const prevGroup = currentGroup - 1;
    setCurrentGroup(prevGroup);
    onPageChange((prevGroup - 1) * pageSize + (currentPage % pageSize));
  };

  // 다음 그룹 버튼 클릭 시 호출
  const handleNextClick = () => {
    const nextGroup = currentGroup + 1;
    setCurrentGroup(nextGroup);
    onPageChange((nextGroup - 1) * pageSize + (currentPage % pageSize));
  };

  const pageButtons = [];
  // 첫 페이지
  const startPage = (currentGroup - 1) * pageSize + 1;
  // 마지막 페이지
  const endPage =
    startPage + pageSize - 1 > totalPages
      ? totalPages
      : startPage + pageSize - 1;

  // pageButtons에 추가
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <PaginationButton
        key={i}
        isActive={i === currentPage}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </PaginationButton>
    );
  }

  return (
    <PaginationContainer>
      <PaginationButton disabled={currentGroup === 1} onClick={handlePrevClick}>
        {"<<"}
      </PaginationButton>
      {pageButtons}
      <PaginationButton
        disabled={
          !totalPages || currentGroup === Math.ceil(totalPages / pageSize)
        }
        onClick={handleNextClick}
      >
        {">>"}
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px 0;
`;

const PaginationButton = styled.button<{ isActive?: boolean }>`
  margin: 0 5px;
  padding: 5px 10px;

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.color.main : "white"};
  color: ${({ isActive, theme }) => (isActive ? "#fff" : theme.color.main)};
  border: none;

  cursor: ${({ isActive }) => (isActive ? "default" : "pointer")};

  &:hover {
    background-color: ${({ isActive }) => (isActive ? "#333" : "#ddd")};
  }

  &:disabled {
    background-color: white;
    color: gray;
  }
`;
