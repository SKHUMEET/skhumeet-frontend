import MemberList from "@/components/List/MemberList";
import Seo from "@/components/utils/Seo";
import { useMemberPost } from "@/hooks/user/post";
import { User, storageConstants } from "@/types";
import { get } from "http";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";

const Like = () => {
  const [user, setUser] = useState<User | null>();
  const { data, page, setPage } = useMemberPost();
  const [totalPages, setTotalPages] = useState(0);
  console.log(data.content);
  useEffect(() => {
    setTotalPages(data.totalPages);
  }, [data]);
  useEffect(() => {
    const storedUser: User | null =
      (typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem(storageConstants.user) ?? "{}")) ??
      null;
    setUser(storedUser);
  }, []);

  return (
    <>
      <Seo title="내가 좋아요 한 글" />
      {/* <MemberList
        user={user}
        list={data.content}
        page={page}
        setPage={setPage}
        totalPage={totalPages}
      /> */}
    </>
  );
};

export default Like;
