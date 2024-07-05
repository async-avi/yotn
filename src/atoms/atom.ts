import { atom } from "recoil";

export const sideBarAtom = atom({
  key: "sideBarAtom",
  default: false,
});

export const currentPage = atom({
  key: "currentPage",
  default: 1,
});
