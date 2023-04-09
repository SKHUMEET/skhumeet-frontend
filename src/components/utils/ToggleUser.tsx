import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
const ToggleUser = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClick = (link: string) => {
    router.push(`/${link}`);
    setIsOpen(false);
  };
  useEffect(() => {
    setIsOpen(false);
  }, []);
  return (
    <ToggleContainer>
      <ImageButton onClick={() => setIsOpen(!isOpen)}>유저이미지</ImageButton>
      {isOpen && (
        <ToggleDropDown.Content>
          <ToggleDropDown.Item onClick={() => handleClick("/")}>
            작성한 글 보기
          </ToggleDropDown.Item>
          <ToggleDropDown.Item onClick={() => handleClick("/")}>
            북마크 한 글 보기
          </ToggleDropDown.Item>
          <ToggleDropDown.Item onClick={() => handleClick("/mypage")}>
            마이페이지
          </ToggleDropDown.Item>
        </ToggleDropDown.Content>
      )}
    </ToggleContainer>
  );
};

export default ToggleUser;

const ToggleContainer = styled.div`
  position: relative;
  width: 100%;
`;

const ImageButton = styled.div``;

const ToggleDropDown = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #fff;
    padding: 8px;
    border: 1px solid #ccc;
  `,

  Item: styled.div`
    :hover {
      background-color: ${({ theme }) => theme.color.hover};
    }
  `,
};
