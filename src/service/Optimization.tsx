import styled from "@emotion/styled";
import { screenSizeAtom, scrollPosition } from "../lib/atom";
import { useAtom } from "jotai";
import ReactPlayer from "react-player";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

const Section = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: rgb(246, 247, 248);
  z-index: 10;
`;

const Wrap = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 0px 30px;
  max-width: 1200px;
  width: 100%;
  height: 100%;
  display: block;
  white-space: pre-wrap;

  @media only screen and (max-width: 768px) {
    padding: 0px 60px;
  }

  @media only screen and (max-width: 600px) {
    padding: 0 20px;
  }

  & > .inner {
    display: flex;
    flex-direction: row;
    width: 100%;

    & > div {
      display: flex;
      flex-direction: row;
      width: 100%;
    }
  }
`;

const StickySide = styled.div`
  position: sticky;
  top: 0px;
  margin-right: 40px;
  padding: 120px 0px 190px;
  height: fit-content;

  @media only screen and (max-width: 768px) {
    padding: 107px 0px 100px;
  }

  & > .inner {
    width: 200px;
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 768px) {
      width: 80px;
    }
  }
`;

const StickyText = styled.h2`
  &.active {
    & span {
      color: rgb(189, 193, 199);
      font-weight: 500;

      & + span {
        color: rgb(0, 0, 0);
        font-weight: 600;
      }
    }
  }

  & strong {
    margin-bottom: 10px;
    display: block;
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 140%;
    color: rgb(0, 0, 0);

    @media only screen and (max-width: 768px) {
      font-size: 1.8rem;
      margin-bottom: 6px;
    }
  }

  &.en span {
    font-size: 3.4rem;
  }

  & span {
    margin-bottom: 12px;
    display: block;
    font-size: 4.8rem;
    line-height: 140%;
    color: rgb(0, 0, 0);
    font-weight: 600;
    transition: 0.4s;

    @media only screen and (max-width: 1280px) {
      font-size: 3.6rem;
    }

    @media only screen and (max-width: 768px) {
      font-size: 2.2rem;
      margin-bottom: 10px;
    }

    & + span {
      font-size: 4.8rem;
      font-weight: 500;
      color: rgb(189, 193, 199);

      @media only screen and (max-width: 1280px) {
        font-size: 3.6rem;
      }

      @media only screen and (max-width: 768px) {
        font-size: 2.2rem;
      }
    }
  }
`;

const RightArea = styled.div`
  padding-top: 120px;
  padding-bottom: 200px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    padding-top: 107px;
    padding-bottom: 99px;
  }

  p {
    font-weight: 500;
    font-size: 2.6rem;
    line-height: 170%;
    color: rgb(0, 0, 0);
    margin-bottom: 60px;

    @media only screen and (max-width: 1280px) {
      margin-bottom: 40px;
      font-size: 2rem;
    }

    @media only screen and (max-width: 768px) {
      margin-bottom: 20px;
      font-size: 1.4rem;
    }
  }

  & .shoes {
    margin-bottom: 230px;

    @media only screen and (max-width: 1280px) {
      margin-bottom: 120px;
    }

    @media only screen and (max-width: 768px) {
      margin-bottom: 81px;
    }
  }

  img {
    width: 100%;
  }
`;

const HalfBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;

  @media only screen and (max-width: 1280px) {
    gap: 20px;
  }

  @media only screen and (max-width: 768px) {
    gap: 10px;
  }

  & .video {
    max-width: 556px;
    width: 100% !important;
    height: auto !important;
  }

  & .layer {
    position: relative;
    cursor: pointer;

    &.en {
      &:after {
        background: url("/images/service_layout01_pc_en.png") repeat center /
          cover;
      }
    }

    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: block;
      background: url("/images/service_layout01_pc_ko.png") repeat center /
        cover;
      z-index: 10;
      transition: 0.3s;
      opacity: 0;
    }

    &:hover:after {
      opacity: 1;
    }

    & svg {
      position: absolute;
      right: 20px;
      bottom: 20px;
      z-index: 11;

      @media only screen and (max-width: 768px) {
        width: 20px;
        height: 20px;
        right: 7.9px;
        bottom: 7.9px;
      }
    }

    & + .layer {
      &.en {
        &:after {
          background: url("/images/service_layout02_pc_en.png") repeat center /
            cover;
        }
      }
      &:after {
        background: url("/images/service_layout02_pc_ko.png") repeat center /
          cover;
      }
    }
  }
`;

const MobileComponent = styled.div`
  padding: 107px 0 80px;
  display: flex;
  align-items: center;
  flex-direction: column;

  & .video {
    max-width: 320px;
    width: 100% !important;
    height: auto !important;
  }

  & .layer {
    position: relative;

    & svg {
      position: absolute;
      right: 20px;
      bottom: 20px;
      z-index: 11;
    }
  }

  img {
    margin-bottom: 58px;
    width: 100%;
  }

  strong {
    display: flex;
    justify-content: center;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 143.84%;
    text-align: center;
    color: rgb(0, 0, 0);
    margin-bottom: 20px;
  }

  p {
    text-align: center;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 170%;
    margin-bottom: 20px;
    color: rgb(0, 0, 0);
  }
`;

const Layer = styled.div`
  position: relative;
  max-width: 320px;

  & + p {
    margin-top: 20px;
  }

  &.second {
    & .layer {
      &.en {
        &.active:after {
          background: url("/images/service_layout02_mobile_en.png") repeat
            center / cover;
        }
      }

      &.active:after {
        background: url("/images/service_layout02_mobile_ko.png") repeat center /
          cover;
      }
    }
  }

  & .layer {
    position: relative;
    cursor: pointer;

    &.active:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: block;
      background: url("/images/service_layout01_mobile_ko.png") repeat center /
        cover;
      z-index: 11;
      transition: 0.3s;
      opacity: 0;
    }
    &.active:after {
      opacity: 1;
    }

    &.en.active:after {
      background: url("/images/service_layout01_mobile_en.png") repeat center /
        cover;
    }
  }

  & button {
    position: absolute;
    right: 10px;
    bottom: 10px;
    z-index: 11;

    & svg {
      width: 26px;
      height: 26px;
    }
  }
`;

export default function Optimization() {
  const { t, i18n } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scroll] = useAtom(scrollPosition);
  const [screenSize] = useAtom(screenSizeAtom);
  const [mobileLayout, setMobileLayout] = useState([false, false]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [action, setAction] = useState(false);

  const checkIfPassedMidPoint = useCallback((scroll: number) => {
    if (sectionRef.current) {
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const sectionMidPoint = sectionTop + 400 + sectionHeight / 2;
      const scrollPosition = scroll + window.innerHeight;

      // 스크롤 위치가 섹션 중간을 지났는지 확인
      if (scrollPosition > sectionMidPoint) {
        setAction(true);
      } else {
        setAction(false);
      }
    }
  }, []);

  useEffect(() => {
    if (scroll) {
      checkIfPassedMidPoint(scroll);
    }
  }, [checkIfPassedMidPoint, scroll]);

  return (
    <Section ref={sectionRef}>
      <Wrap>
        <div className="inner">
          <div>
            {screenSize !== "mobile" && (
              <>
                <StickySide>
                  <div className="inner">
                    <StickyText
                      className={clsx(
                        i18n.language === "en" ? "en" : "",
                        action ? "active" : ""
                      )}
                    >
                      <strong>3D model</strong>
                      <span>{t("service.optimization.side1")}</span>
                      <span>{t("service.optimization.side2")}</span>
                    </StickyText>
                  </div>
                </StickySide>
                <RightArea>
                  <p>
                    {t("service.optimization.text1")}
                    <br />
                    {t("service.optimization.text2")}
                  </p>
                  <img
                    className="shoes"
                    src="/images/optimization01.png"
                    alt="original 3d shoes image"
                  />
                  <p>
                    {t("service.optimization.text3")}
                    <br />
                    {t("service.optimization.text4")}
                  </p>

                  <HalfBox>
                    <div
                      className={clsx(
                        "layer",
                        i18n.language === "en" ? "en" : ""
                      )}
                    >
                      <ReactPlayer
                        onContextMenu={(e: React.MouseEvent<HTMLDivElement>) =>
                          e.preventDefault()
                        }
                        className="video"
                        url={
                          i18n.language === "en"
                            ? "/service_video_pc_en.mp4"
                            : "/service_video_pc_ko.mp4"
                        }
                        muted
                        playing
                        volume={0}
                        loop
                        controls={false}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                      >
                        <path
                          d="M22.9769 33.4999H25.2461V25.2769H33.4999V23.0077H25.2461V14.5H22.9769V23.0077H14.5V25.2769H22.9769V33.4999ZM24.0166 42.9999C21.3848 42.9999 18.9198 42.5012 16.6218 41.5039C14.3237 40.5066 12.3111 39.1447 10.584 37.4184C8.85687 35.692 7.49442 33.6791 6.49665 31.3795C5.49888 29.08 5 26.6129 5 23.9783C5 21.3565 5.49867 18.8921 6.496 16.5851C7.49333 14.2781 8.85517 12.2694 10.5815 10.559C12.3079 8.84853 14.3208 7.49442 16.6203 6.49665C18.9199 5.49888 21.387 5 24.0216 5C26.6434 5 29.1078 5.49867 31.4148 6.496C33.7218 7.49333 35.7305 8.84683 37.4409 10.5565C39.1514 12.2662 40.5055 14.2767 41.5033 16.588C42.501 18.8992 42.9999 21.3643 42.9999 23.9833C42.9999 26.6151 42.5012 29.0801 41.5039 31.3782C40.5066 33.6762 39.1531 35.6857 37.4434 37.4067C35.7337 39.1277 33.7232 40.4901 31.412 41.494C29.1007 42.4979 26.6356 42.9999 24.0166 42.9999ZM24.025 40.7307C28.6647 40.7307 32.6089 39.1012 35.8577 35.8423C39.1064 32.5833 40.7307 28.6275 40.7307 23.975C40.7307 19.3352 39.1095 15.391 35.867 12.1423C32.6245 8.89355 28.6689 7.2692 24 7.2692C19.3641 7.2692 15.4166 8.89043 12.1577 12.1329C8.89868 15.3754 7.2692 19.3311 7.2692 24C7.2692 28.6359 8.89868 32.5833 12.1577 35.8423C15.4166 39.1012 19.3724 40.7307 24.025 40.7307Z"
                          fill="#6F757B"
                        />
                      </svg>
                    </div>

                    <div
                      className={clsx(
                        "layer",
                        i18n.language === "en" ? "en" : ""
                      )}
                    >
                      <ReactPlayer
                        onContextMenu={(e: React.MouseEvent<HTMLDivElement>) =>
                          e.preventDefault()
                        }
                        className="video"
                        url={
                          i18n.language === "en"
                            ? "/service_video2_pc_en.mp4"
                            : "/service_video2_pc_ko.mp4"
                        }
                        muted
                        playing
                        volume={0}
                        loop
                        controls={false}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                      >
                        <path
                          d="M22.9769 33.4999H25.2461V25.2769H33.4999V23.0077H25.2461V14.5H22.9769V23.0077H14.5V25.2769H22.9769V33.4999ZM24.0166 42.9999C21.3848 42.9999 18.9198 42.5012 16.6218 41.5039C14.3237 40.5066 12.3111 39.1447 10.584 37.4184C8.85687 35.692 7.49442 33.6791 6.49665 31.3795C5.49888 29.08 5 26.6129 5 23.9783C5 21.3565 5.49867 18.8921 6.496 16.5851C7.49333 14.2781 8.85517 12.2694 10.5815 10.559C12.3079 8.84853 14.3208 7.49442 16.6203 6.49665C18.9199 5.49888 21.387 5 24.0216 5C26.6434 5 29.1078 5.49867 31.4148 6.496C33.7218 7.49333 35.7305 8.84683 37.4409 10.5565C39.1514 12.2662 40.5055 14.2767 41.5033 16.588C42.501 18.8992 42.9999 21.3643 42.9999 23.9833C42.9999 26.6151 42.5012 29.0801 41.5039 31.3782C40.5066 33.6762 39.1531 35.6857 37.4434 37.4067C35.7337 39.1277 33.7232 40.4901 31.412 41.494C29.1007 42.4979 26.6356 42.9999 24.0166 42.9999ZM24.025 40.7307C28.6647 40.7307 32.6089 39.1012 35.8577 35.8423C39.1064 32.5833 40.7307 28.6275 40.7307 23.975C40.7307 19.3352 39.1095 15.391 35.867 12.1423C32.6245 8.89355 28.6689 7.2692 24 7.2692C19.3641 7.2692 15.4166 8.89043 12.1577 12.1329C8.89868 15.3754 7.2692 19.3311 7.2692 24C7.2692 28.6359 8.89868 32.5833 12.1577 35.8423C15.4166 39.1012 19.3724 40.7307 24.025 40.7307Z"
                          fill="#6F757B"
                        />
                      </svg>
                    </div>
                  </HalfBox>
                </RightArea>
              </>
            )}

            {screenSize === "mobile" && (
              <>
                <MobileComponent>
                  <strong>{t("service.optimization.mobileText1")}</strong>
                  <p>
                    {t("service.optimization.mobileText2")}
                    <br />
                    {t("service.optimization.mobileText3")}
                  </p>
                  <img
                    className="shoes"
                    src="/images/optimization01.png"
                    alt="original 3d shoes image"
                  />
                  <strong>{t("service.optimization.mobileText4")}</strong>
                  <p>
                    {t("service.optimization.mobileText5")}
                    <br />
                    {t("service.optimization.mobileText6")}
                  </p>

                  <Layer>
                    <div
                      className={clsx(
                        "layer",
                        mobileLayout[0] ? "active" : "",
                        i18n.language === "en" ? "en" : ""
                      )}
                    >
                      <ReactPlayer
                        onContextMenu={(e: React.MouseEvent<HTMLDivElement>) =>
                          e.preventDefault()
                        }
                        className="video"
                        url={
                          i18n.language === "en"
                            ? "/service_video_mobile_en.mp4"
                            : "/service_video_mobile_ko.mp4"
                        }
                        muted
                        playing
                        volume={0}
                        loop
                        controls={false}
                      />
                    </div>
                    <button
                      onClick={() =>
                        setMobileLayout((prev) => [!prev[0], prev[1]])
                      }
                    >
                      {mobileLayout[0] ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_2961_7540)">
                            <path
                              d="M8.9705 16.2467L9.83962 17.1158L12.9892 13.9662L16.1505 17.1276L17.0197 16.2585L13.8583 13.0971L17.1169 9.83853L16.2478 8.96941L12.9892 12.228L9.74241 8.98119L8.87327 9.85033L12.1201 13.0971L8.9705 16.2467ZM5.73006 20.2836C4.72203 19.2755 3.96891 18.1404 3.47071 16.8782C2.97251 15.616 2.72326 14.3236 2.72297 13.0008C2.72267 11.6781 2.97183 10.3853 3.47042 9.12235C3.96902 7.85943 4.72287 6.72342 5.73198 5.71431C6.73619 4.7101 7.87109 3.9572 9.13669 3.45559C10.4023 2.95397 11.6933 2.70621 13.0096 2.7123C14.326 2.71839 15.6156 2.97074 16.8785 3.46934C18.1414 3.96793 19.2774 4.72179 20.2866 5.73089C21.2908 6.7351 22.0437 7.87 22.5453 9.1356C23.0469 10.4012 23.2978 11.689 23.2981 12.9989C23.2984 14.3089 23.047 15.5976 22.5439 16.865C22.0409 18.1324 21.2878 19.2677 20.2846 20.2708C19.2766 21.2788 18.1415 22.032 16.8793 22.5302C15.6171 23.0284 14.329 23.2796 13.015 23.284C11.701 23.2883 10.4092 23.0401 9.13939 22.5393C7.86963 22.0386 6.73318 21.2867 5.73006 20.2836ZM6.6024 19.4176C8.3795 21.1947 10.5143 22.0813 13.0069 22.0774C15.4994 22.0734 17.6367 21.1805 19.4187 19.3985C21.1958 17.6214 22.0855 15.4897 22.0879 13.0035C22.0903 10.5172 21.1974 8.38 19.4091 6.59174C17.6335 4.81612 15.5006 3.92514 13.0105 3.91882C10.5203 3.9125 8.38109 4.80348 6.59283 6.59174C4.8172 8.36737 3.92939 10.5034 3.92939 12.9999C3.92939 15.4964 4.8204 17.6356 6.6024 19.4176Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_2961_7540">
                              <rect width="26" height="26" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                          fill="none"
                        >
                          <path
                            d="M22.9769 33.4999H25.2461V25.2769H33.4999V23.0077H25.2461V14.5H22.9769V23.0077H14.5V25.2769H22.9769V33.4999ZM24.0166 42.9999C21.3848 42.9999 18.9198 42.5012 16.6218 41.5039C14.3237 40.5066 12.3111 39.1447 10.584 37.4184C8.85687 35.692 7.49442 33.6791 6.49665 31.3795C5.49888 29.08 5 26.6129 5 23.9783C5 21.3565 5.49867 18.8921 6.496 16.5851C7.49333 14.2781 8.85517 12.2694 10.5815 10.559C12.3079 8.84853 14.3208 7.49442 16.6203 6.49665C18.9199 5.49888 21.387 5 24.0216 5C26.6434 5 29.1078 5.49867 31.4148 6.496C33.7218 7.49333 35.7305 8.84683 37.4409 10.5565C39.1514 12.2662 40.5055 14.2767 41.5033 16.588C42.501 18.8992 42.9999 21.3643 42.9999 23.9833C42.9999 26.6151 42.5012 29.0801 41.5039 31.3782C40.5066 33.6762 39.1531 35.6857 37.4434 37.4067C35.7337 39.1277 33.7232 40.4901 31.412 41.494C29.1007 42.4979 26.6356 42.9999 24.0166 42.9999ZM24.025 40.7307C28.6647 40.7307 32.6089 39.1012 35.8577 35.8423C39.1064 32.5833 40.7307 28.6275 40.7307 23.975C40.7307 19.3352 39.1095 15.391 35.867 12.1423C32.6245 8.89355 28.6689 7.2692 24 7.2692C19.3641 7.2692 15.4166 8.89043 12.1577 12.1329C8.89868 15.3754 7.2692 19.3311 7.2692 24C7.2692 28.6359 8.89868 32.5833 12.1577 35.8423C15.4166 39.1012 19.3724 40.7307 24.025 40.7307Z"
                            fill="#6F757B"
                          />
                        </svg>
                      )}
                    </button>
                  </Layer>

                  <p>
                    {t("service.optimization.mobileText7")}
                    <br />
                    {t("service.optimization.mobileText8")}
                  </p>

                  <Layer className="second">
                    <div
                      className={clsx(
                        "layer",
                        mobileLayout[1] ? "active" : "",
                        i18n.language === "en" ? "en" : ""
                      )}
                    >
                      <ReactPlayer
                        onContextMenu={(e: React.MouseEvent<HTMLDivElement>) =>
                          e.preventDefault()
                        }
                        className="video"
                        url={
                          i18n.language === "en"
                            ? "/service_video2_mobile_en.mp4"
                            : "/service_video2_mobile_ko.mp4"
                        }
                        muted
                        playing
                        volume={0}
                        loop
                        controls={false}
                      />
                    </div>
                    <button
                      onClick={() =>
                        setMobileLayout((prev) => [prev[0], !prev[1]])
                      }
                    >
                      {mobileLayout[1] ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_2961_7540)">
                            <path
                              d="M8.9705 16.2467L9.83962 17.1158L12.9892 13.9662L16.1505 17.1276L17.0197 16.2585L13.8583 13.0971L17.1169 9.83853L16.2478 8.96941L12.9892 12.228L9.74241 8.98119L8.87327 9.85033L12.1201 13.0971L8.9705 16.2467ZM5.73006 20.2836C4.72203 19.2755 3.96891 18.1404 3.47071 16.8782C2.97251 15.616 2.72326 14.3236 2.72297 13.0008C2.72267 11.6781 2.97183 10.3853 3.47042 9.12235C3.96902 7.85943 4.72287 6.72342 5.73198 5.71431C6.73619 4.7101 7.87109 3.9572 9.13669 3.45559C10.4023 2.95397 11.6933 2.70621 13.0096 2.7123C14.326 2.71839 15.6156 2.97074 16.8785 3.46934C18.1414 3.96793 19.2774 4.72179 20.2866 5.73089C21.2908 6.7351 22.0437 7.87 22.5453 9.1356C23.0469 10.4012 23.2978 11.689 23.2981 12.9989C23.2984 14.3089 23.047 15.5976 22.5439 16.865C22.0409 18.1324 21.2878 19.2677 20.2846 20.2708C19.2766 21.2788 18.1415 22.032 16.8793 22.5302C15.6171 23.0284 14.329 23.2796 13.015 23.284C11.701 23.2883 10.4092 23.0401 9.13939 22.5393C7.86963 22.0386 6.73318 21.2867 5.73006 20.2836ZM6.6024 19.4176C8.3795 21.1947 10.5143 22.0813 13.0069 22.0774C15.4994 22.0734 17.6367 21.1805 19.4187 19.3985C21.1958 17.6214 22.0855 15.4897 22.0879 13.0035C22.0903 10.5172 21.1974 8.38 19.4091 6.59174C17.6335 4.81612 15.5006 3.92514 13.0105 3.91882C10.5203 3.9125 8.38109 4.80348 6.59283 6.59174C4.8172 8.36737 3.92939 10.5034 3.92939 12.9999C3.92939 15.4964 4.8204 17.6356 6.6024 19.4176Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_2961_7540">
                              <rect width="26" height="26" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                          fill="none"
                        >
                          <path
                            d="M22.9769 33.4999H25.2461V25.2769H33.4999V23.0077H25.2461V14.5H22.9769V23.0077H14.5V25.2769H22.9769V33.4999ZM24.0166 42.9999C21.3848 42.9999 18.9198 42.5012 16.6218 41.5039C14.3237 40.5066 12.3111 39.1447 10.584 37.4184C8.85687 35.692 7.49442 33.6791 6.49665 31.3795C5.49888 29.08 5 26.6129 5 23.9783C5 21.3565 5.49867 18.8921 6.496 16.5851C7.49333 14.2781 8.85517 12.2694 10.5815 10.559C12.3079 8.84853 14.3208 7.49442 16.6203 6.49665C18.9199 5.49888 21.387 5 24.0216 5C26.6434 5 29.1078 5.49867 31.4148 6.496C33.7218 7.49333 35.7305 8.84683 37.4409 10.5565C39.1514 12.2662 40.5055 14.2767 41.5033 16.588C42.501 18.8992 42.9999 21.3643 42.9999 23.9833C42.9999 26.6151 42.5012 29.0801 41.5039 31.3782C40.5066 33.6762 39.1531 35.6857 37.4434 37.4067C35.7337 39.1277 33.7232 40.4901 31.412 41.494C29.1007 42.4979 26.6356 42.9999 24.0166 42.9999ZM24.025 40.7307C28.6647 40.7307 32.6089 39.1012 35.8577 35.8423C39.1064 32.5833 40.7307 28.6275 40.7307 23.975C40.7307 19.3352 39.1095 15.391 35.867 12.1423C32.6245 8.89355 28.6689 7.2692 24 7.2692C19.3641 7.2692 15.4166 8.89043 12.1577 12.1329C8.89868 15.3754 7.2692 19.3311 7.2692 24C7.2692 28.6359 8.89868 32.5833 12.1577 35.8423C15.4166 39.1012 19.3724 40.7307 24.025 40.7307Z"
                            fill="#6F757B"
                          />
                        </svg>
                      )}
                    </button>
                  </Layer>
                </MobileComponent>
              </>
            )}
          </div>
        </div>
      </Wrap>
    </Section>
  );
}
