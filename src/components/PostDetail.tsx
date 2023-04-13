import { MAIN, User, storageConstants } from "@/types";
import React, { useEffect, useState } from "react";
import { Modal } from "./modal";
import RegisterForm from "./register/RegisterForm";
import { del, instance } from "@/libs/api";
import Comment from "./Comment";
import { useDeleteMainCategory } from "@/hooks/main";
import { useRouter } from "next/router";
const PostDetail = ({ data }: { data: MAIN }) => {
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
        <div>
          작성자: {data.member} | 마감일: {data.endDate} | 작성일:
          {data.createDate}
        </div>
        <div>조회수: {data.view}</div>
        <div>연락 방법: {data.contact}</div>
        <div dangerouslySetInnerHTML={{ __html: data.context }} />
        <div>{data.title}</div>
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
