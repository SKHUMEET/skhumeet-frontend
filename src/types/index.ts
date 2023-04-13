export interface IdProps extends CategoryProps {
  id: number;
}

export const categoryList: Category[] = [
  "hansotbab",
  "eoullim",
  "study",
  "club",
  "contest",
  "department_event",
  "etc",
];

export const statusList: Status[] = [
  "recruiting",
  "recruitment_deadline",
  "promotion",
  "activity",
];

export interface CategoryProps {
  category: Category;
}

export type Category =
  | "hansotbab"
  | "eoullim"
  | "study"
  | "club"
  | "contest"
  | "department_event"
  | "etc";

export type Status =
  | "recruiting"
  | "recruitment_deadline"
  | "promotion"
  | "activity";

type ConvertKoreanObj = {
  [key in Category | Status]: string;
};

export const ConvertKorean: ConvertKoreanObj = {
  hansotbab: "한솥밥",
  eoullim: "어울림",
  study: "스터디",
  club: "동아리",
  contest: "대회",
  department_event: "학부활동",
  recruiting: "모집 중",
  recruitment_deadline: "모집 완료",
  promotion: "홍보",
  activity: "활동",
  etc: "기타",
};

export interface User {
  memberNumber: string;
  loginId: string;
  name: string;
  nickname: string;
  profileImage: string;
}

export const storageConstants = {
  accessToken: "ACCESS_TOKEN",
  refreshToken: "REFRESH_TOKEN",
  user: "skhumeet_user",
};

export interface MAIN {
  id: number;
  member: string;
  memberNumber: string;
  title: string;
  category: Category;
  contact: string;
  status: Status;
  endDate: string;
  createdDate: string;
  view: number;
  context: string;
  images: string[];
  bookmarked: boolean;
}

export type MAINREQUEST = Omit<
  MAIN,
  "id" | "createdDate" | "member" | "memberNumber" | "bookmarked"
>;

export const formDate = (data: string | undefined) => {
  if (typeof data === "string") {
    return data.split("T")[0];
  } else {
    return data;
  }
};
