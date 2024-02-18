import { atom } from "jotai";

export type IScreenSizeAtom =
  | "bigDesctop"
  | "desctop"
  | "notebook"
  | "tablet"
  | "mobile";

export const screenSizeAtom = atom<IScreenSizeAtom>("bigDesctop");

export const updateScreenSize = (width: number) => {
  if (width >= 1280) return "bigDesctop";
  if (width >= 1025 && width <= 1279) return "desctop";
  if (width >= 769 && width <= 1024) return "notebook";
  if (width >= 601 && width <= 768) return "tablet";
  return "mobile";
};

export const scrollPosition = atom(0);
