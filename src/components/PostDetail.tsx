import { MAIN, User, formDate, storageConstants } from "@/types";
import React, { useEffect, useState } from "react";
import { Modal } from "./modal";
import RegisterForm from "./register/RegisterForm";
import { del, instance } from "@/libs/api";
import Comment from "./Comment";
import { useDeleteMainCategory } from "@/hooks/main";
import { useRouter } from "next/router";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
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
        <div>
          작성자: {data.member} | 마감일: {formDate(data.endDate)} | 작성일:
          {formDate(data.createdDate)}
        </div>
        <Bookmark isMarked={data.bookmarked} postId={data.id} />
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
