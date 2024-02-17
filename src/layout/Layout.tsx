import styled from "@emotion/styled";
import Header from "./Header";
import { useSetAtom } from "jotai";
import { screenSizeAtom, updateScreenSize } from "../lib/atom";
import { useEffect, useState } from "react";
import TopButton from "../components/TopButton";

const Wrap = styled.div``;

export default function Layout({ children }: { children: JSX.Element }) {
  const setScreenSize = useSetAtom(screenSizeAtom);
  const [scrollStatus, setScrollStatus] = useState<boolean>(false);

  const handleScroll = () => {
    // 현재 스크롤 위치
    const scrolled = window.scrollY;
    // 전체 높이
    const documentHeight = document.documentElement.scrollHeight;
    // 브라우저 높이
    const windowHeight = window.innerHeight;
    // 전체 스크롤 가능한 높이
    const totalScrollableHeight = documentHeight - windowHeight;

    if (scrolled >= totalScrollableHeight * (3 / 5)) {
      setScrollStatus(true);
    } else {
      setScrollStatus(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      // 현재 창 너비에 따라 screenSizeAtom 상태 업데이트
      setScreenSize(updateScreenSize(window.innerWidth));
    };

    // 컴포넌트 마운트 시 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);
    // 초기 상태 업데이트
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Wrap>
      <>
        <Header />
        {children}
        {scrollStatus && <TopButton />}
      </>
    </Wrap>
  );
}
