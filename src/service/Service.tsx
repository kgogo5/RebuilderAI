import styled from "@emotion/styled";
import Transformation from "./Transformation";
import { useEffect, useState } from "react";
import Optimization from "./Optimization";

const Wrap = styled.div`
  @media only screen and (max-width: 768px) {
    padding-top: 65px;
  }

  & .video {
    width: 100% !important;
    height: 58vh !important;
    clip-path: inset(4px);
  }
`;

export default function Service() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
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
          <Transformation scrollPosition={scrollPosition} />

          <Optimization />
        </Wrap>
      </main>
    </>
  );
}
