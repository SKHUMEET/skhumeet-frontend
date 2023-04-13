import {
  Category,
  ConvertKorean,
  MAIN,
  User,
  formDate,
  storageConstants,
} from "@/types";
import React, { useEffect, useState } from "react";
import { Modal } from "./modal";
import RegisterForm from "./register/RegisterForm";
import Comment from "./Comment";
import { useDeleteMainCategory } from "@/hooks/main";
import { useRouter } from "next/router";
import styled from "styled-components";
import Bookmark from "./utils/Bookmark";

const PostDetail = ({ data }: { data: MAIN }) => {
  const deletePost = useDeleteMainCategory();
  const router = useRouter();

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
    <>
      <div>
        <div>
          {data.memberNumber === user?.memberNumber && (
            <>
              <button onClick={() => setIsModalOpen(true)}>수정하기</button>
              <button onClick={handleDelete}>삭제하기</button>
            </>
          )}
        </div>
        {/* <button onClick={handleAButton}>custom alert</button> */}
        <Bookmark isMarked={data.bookmarked} postId={data.id} />
        {ConvertKorean[data.category.toLowerCase() as Category]}
        <InfoContainer>
          작성자: {data.member} &#183; 마감일: {formDate(data.endDate)} &#183;
          작성일:
          {formDate(data.createdDate)}
        </InfoContainer>
        <InfoContainer>
          <TitleContainer>{data.title}</TitleContainer>
          <ContactContainer>
            조회수: {data.view} &#183; 연락 방법: {data.contact}
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
    </>
  );
};

export default PostDetail;

const InfoContainer = styled.div`
  padding: 5px 1rem;

  border-bottom: 2px solid #6ab03061;

  font-size: 15px;
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
