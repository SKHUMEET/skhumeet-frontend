export interface IdProps extends CategoryProps {
  id: number;
}

export const categoryList: Category[] = [
  "hansotbab",
  "eoullim",
  "study",
  "club",
  "contest",
  "departmentEvent",
  "etc",
];

export const messageList: Message[] = ["openchat", "phonenumber", "etc"];

export const situationList: Situation[] = [
  "recruiting",
  "recruitmentCompleted",
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
  | "departmentEvent"
  | "etc";

export type Message = "openchat" | "phonenumber" | "etc";

export type Situation =
  | "recruiting"
  | "recruitmentCompleted"
  | "promotion"
  | "activity";

type ConvertKoreanObj = {
  [key in Category | Message | Situation]: string;
};

export const ConvertKorean: ConvertKoreanObj = {
  hansotbab: "한솥밥",
  eoullim: "어울림",
  study: "스터디",
  club: "동아리",
  contest: "대회",
  departmentEvent: "학부활동",
  openchat: "오픈채팅",
  phonenumber: "전화번호",
  recruiting: "모집 중",
  recruitmentCompleted: "모집 완료",
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
  nickname: string;
  title: string;
  category: string;
  contact: string;
  endDate: Date | string;
  createDate: Date | string;
  view: number;
  context: string;
  images: string[];
}

export type MAINREQUEST = Omit<MAIN, "id" | "createDate" | "nickname">;
