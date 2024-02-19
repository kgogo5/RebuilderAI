import styled from "@emotion/styled";
import Transformation from "./Transformation";
import { useEffect } from "react";
import Optimization from "./Optimization";
import { scrollPosition } from "../lib/atom";
import { useSetAtom } from "jotai";

const Wrap = styled.div`
  background: rgb(246, 247, 248);
  @media only screen and (max-width: 768px) {
    padding-top: 65px;
  }
`;

export default function Service() {
  const setScroll = useSetAtom(scrollPosition);

  const handleScroll = () => {
    const position = window.scrollY;
    setScroll(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <main>
        <Wrap>
          <Transformation />

          <Optimization />
        </Wrap>
      </main>
    </>
  );
}
