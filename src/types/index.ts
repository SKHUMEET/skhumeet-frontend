export interface IdProps extends CategoryProps {
  id: number;
}

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

export type Situation = "모집중" | "모집완료" | "홍보" | "활동";

export const CategoryKorean = {
  hansotbab: "한솥밥",
  eoullim: "어울림",
  study: "스터디",
  club: "동아리",
  contest: "대회",
  departmentEvent: "학부활동",
  etc: "기타",
};
