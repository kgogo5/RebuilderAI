import styled from "@emotion/styled";
import Transformation from "./Transformation";
import { useCallback, useEffect } from "react";
import Optimization from "./Optimization";
import { scrollPosition } from "../lib/atom";
import { useSetAtom } from "jotai";
import Vrin from "./Vrin";
import Commerce from "./Commerce";
import Manufacture from "./Manufacture";
import Damage from "./Damage";
import Labeling from "./Labeling";

const Wrap = styled.div`
  background: rgb(255, 255, 255);
`;

export default function Service() {
  const setScroll = useSetAtom(scrollPosition);

  const handleScroll = useCallback(() => {
    const position = window.scrollY;
    setScroll(position);
  }, [setScroll]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <main>
        <Wrap>
          <Transformation />

          <Optimization />

          <Vrin />

          <Commerce />

          <Manufacture />

          <Damage />

          <Labeling />
        </Wrap>
      </main>
    </>
  );
}
