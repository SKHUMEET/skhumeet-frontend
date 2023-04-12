import MemberList from "@/components/List/MemberList";
import Seo from "@/components/utils/Seo";
import { useMemberPost } from "@/hooks/user/post";
import { User, storageConstants } from "@/types";
import { get } from "http";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";

const Post = () => {
  const [user, setUser] = useState<User | null>();
  const { data, page, setPage } = useMemberPost();
  const [totalPage, setTotalPage] = useState(0);
  console.log(data);
  useEffect(() => {
    setTotalPage(data.totalPage);
  }, [data]);
  useEffect(() => {
    const storedUser: User | null =
      (typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem(storageConstants.user) ?? "{}")) ??
      null;
    setUser(storedUser);
  }, []);

  return (
    // <MemberList
    //   user={user}
    //   list={data.content}
    //   page={page}
    //   setPage={setPage}
    //   totalPage={totalPage}
    // />
    <>
      <Seo title="내가 쓴 글" />
    </>
  );
};

export default Post;
