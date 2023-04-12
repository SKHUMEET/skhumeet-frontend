import Seo from "@/components/utils/Seo";
import React, { useEffect, useState } from "react";
import MyPageRegisterForm from "@/components/register/MyPageRegisterForm";
import { User, storageConstants } from "@/types";
const MyPage = () => {
  const [user, setUser] = useState<User | null>();
  useEffect(() => {
    const storedUser: User | null =
      (typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem(storageConstants.user) ?? "{}")) ??
      null;
    setUser(storedUser);
  }, []);
  return (
    <>
      <Seo title="MYPAGE" />
      <MyPageRegisterForm user={user} />
    </>
  );
};

export default MyPage;
