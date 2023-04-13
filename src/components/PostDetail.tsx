import {
  CategoryProps,
  ConvertKorean,
  MAIN,
  User,
  storageConstants,
} from "@/types";
import React, { useEffect, useState } from "react";
import { Modal } from "./modal";
import RegisterForm from "./register/RegisterForm";
import Comment from "./Comment";
import { useDeleteMainCategory } from "@/hooks/main";
import { useRouter } from "next/router";
import styled from "styled-components";

const PostDetail = ({ data }: { data: MAIN }, { category }: CategoryProps) => {
  const deletePost = useDeleteMainCategory();
  const router = useRouter();

  const [user, setUser] = useState<User>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bookmark, setBookmark] = useState(false);

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
    data.category === "department_event" || data.category === "club"
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
        {ConvertKorean[category]}
        <InfoContainer>
          작성자: {data.member} | 마감일: {data.endDate} | 작성일:
          {data.createDate}
        </InfoContainer>
        <ContactContainer>
          조회수: {data.view} | 연락 방법: {data.contact}
        </ContactContainer>
        <InfoContainer>
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
    </>
  );
};

export default PostDetail;

const InfoContainer = styled.div`
  padding: 1rem;
  border-bottom: 2px solid #6ab03061;
`;

const ContactContainer = styled.div`
  padding: 1rem;
  padding-bottom: 0;

  font-size: 16px;
`;

const TitleContainer = styled.div`
  padding-bottom: 10px;

  border-bottom: 1px solid ${({ theme }) => theme.color.hover};

  font-size: x-large;
`;

const ContentContainer = styled.div`
  padding-top: 10px;
`;
