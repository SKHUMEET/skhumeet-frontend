import {
  Category,
  ConvertKorean,
  MAIN,
  User,
  formDate,
  storageConstants,
} from "@/types";
import React, { useContext, useEffect, useState } from "react";
import { Modal } from "./modal";
import RegisterForm from "./register/RegisterForm";
import Comment from "./comment/Comment";
import { useDeleteMainCategory } from "@/hooks/main";
import { useRouter } from "next/router";
import styled, { ThemeContext } from "styled-components";
import Bookmark from "./utils/Bookmark";
import Btn from "./utils/Btn";

const PostDetail = ({ data }: { data: MAIN }) => {
  const deletePost = useDeleteMainCategory();
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  //Todo 북마크달리거나 댓글달린 글은 500에러 남
  const handleDelete = async () => {
    deletePost(data.id);
    router.push(`/${data.category.toLowerCase()}`);
  };

  useEffect(() => {
    const storedUser: User | null =
      (typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem(storageConstants.user) ?? "{}")) ??
      null;
    setUser(storedUser as User);
  }, []);

  const registerStyle =
    data.category.toLowerCase() === "department_event" ||
    data.category.toLowerCase() === "club"
      ? "grid"
      : "list";

  return (
    <Container>
      <div>
        <Header>
          <UDContainer>
            {data.memberNumber === user?.memberNumber && (
              <>
                <Btn onClick={() => setIsModalOpen(true)}>수정하기</Btn>
                <Btn onClick={handleDelete}>삭제하기</Btn>
              </>
            )}
            <InfoContainer>
              <BookmarkWrapper>
                <Bookmark isMarked={data.bookmarked} postId={data.id} />
              </BookmarkWrapper>
            </InfoContainer>
          </UDContainer>

          <h3>{ConvertKorean[data.category.toLowerCase() as Category]}</h3>
        </Header>
        <InfoContainer>
          <h1>{data.title}</h1>
          <ContactContainer>
            <span>조회수 {data.view}</span>
            <span>&nbsp; &#183; &nbsp;</span>
            <span>연락 방법 {data.contact}</span>
            <span>&nbsp; &#183; &nbsp;</span>
            <span>작성자 {data.member}</span>
            <span>&nbsp; &#183; &nbsp;</span>
            마감일 {formDate(data.endDate)}
            <span></span>
            &nbsp; &#183; &nbsp;
            <span></span>
            <span>
              작성일
              {formDate(data.createdDate)}
            </span>
          </ContactContainer>

          <ContentContainer
            dangerouslySetInnerHTML={{ __html: data.context }}
          />
        </InfoContainer>
      </div>
      <Comment postId={data.id} />

      <Modal show={isModalOpen} onClose={handleModalClose}>
        <RegisterForm
          category={data.category}
          kind="edit"
          type={registerStyle}
          data={data}
        />
      </Modal>
    </Container>
  );
};

export default PostDetail;

const Container = styled.div`
  padding: 0 1rem;
`;

const Header = styled.div`
  margin-top: 1rem;
`;

const UDContainer = styled.div`
  float: right;
`;

const InfoContainer = styled.div`
  padding: 1rem 0;

  font-size: 15px;
`;

const BookmarkWrapper = styled.div`
  float: right;
`;

const ContactContainer = styled.div`
  margin-top: 1rem;

  padding-bottom: 1rem;

  border-bottom: 2px solid ${({ theme }) => theme.color.light};

  color: ${({ theme }) => theme.color.hover};
  font-size: 12px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr 10px);
  }
`;

export const ContentContainer = styled.div`
  padding: 1rem 0;

  border-bottom: 2px solid ${({ theme }) => theme.color.light};
  line-height: 180%;
`;
