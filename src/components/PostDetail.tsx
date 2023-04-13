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
  const theme = useContext(ThemeContext);
  const [user, setUser] = useState<User>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

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
                <Btn
                  onClick={() => setIsModalOpen(true)}
                  color={theme.color.light}
                >
                  수정하기
                </Btn>
                <Btn onClick={handleDelete} color={theme.color.light}>
                  삭제하기
                </Btn>
              </>
            )}
          </UDContainer>
          {/* <button onClick={handleAButton}>custom alert</button> */}
          <p style={{ fontWeight: "bold" }}>
            {ConvertKorean[data.category.toLowerCase() as Category]}
          </p>
        </Header>
        <InfoContainer>
          작성자: {data.member} &#183; 마감일: {formDate(data.endDate)} &#183;
          작성일: {formDate(data.createdDate)}
          <BookmarkWrapper>
            <Bookmark isMarked={data.bookmarked} postId={data.id} />
          </BookmarkWrapper>
        </InfoContainer>
        <InfoContainer>
          <ContactContainer>
            조회수: {data.view} &#183; 연락 방법: {data.contact}
          </ContactContainer>
          <TitleContainer>{data.title}</TitleContainer>
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
  padding: 10px 0;

  border-bottom: 2px solid #6ab03061;

  font-size: 15px;
`;

const BookmarkWrapper = styled.div`
  float: right;
`;

const ContactContainer = styled.div`
  margin: 0;
  font-size: 12px;
`;

const TitleContainer = styled.div`
  font-size: x-large;
`;

const ContentContainer = styled.div`
  padding-top: 10px;
`;
