import styled from "@emotion/styled";
import Section from "../components/Section";
import ReactPlayer from "react-player";
import { IScreenSizeAtom, screenSizeAtom } from "../lib/atom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

const HalfArea = styled.div`
  display: flex;

  @media (max-width: 1280px) {
    align-items: center;
    flex-direction: column;
  }

  strong {
    display: block;
    font-weight: 700;
    font-size: 2.4rem;
    line-height: 130%;
    color: rgb(23, 60, 254);
    margin-bottom: 16px;

    @media (max-width: 1280px) {
      font-size: 2.2rem;
      text-align: center;
    }

    @media only screen and (max-width: 768px) {
      font-size: 2rem;
      margin-bottom: 12px;
    }

    @media only screen and (max-width: 600px) {
      font-size: 1.4rem;
      margin-bottom: 10px;
    }
  }

  h2 {
    font-weight: 600;
    font-size: 4rem;
    line-height: 140%;
    color: rgb(40, 45, 50);
    margin-bottom: 40px;

    @media (max-width: 1280px) {
      text-align: center;
    }

    @media only screen and (max-width: 768px) {
      font-size: 3.2rem;
    }

    @media only screen and (max-width: 600px) {
      font-size: 2rem;
      margin-bottom: 36px;
    }
  }

  p {
    font-weight: 500;
    font-size: 2.2rem;
    line-height: 130%;
    color: rgb(111, 117, 123);
    margin-bottom: 31px;

    @media only screen and (max-width: 1280px) {
      text-align: center;
    }

    @media only screen and (max-width: 768px) {
      font-size: 1.8rem;
      margin-bottom: 34px;
    }

    @media only screen and (max-width: 600px) {
      font-size: 1.6rem;
      margin-bottom: 24px;
    }
  }

  .video {
    width: inherit !important;
    height: inherit !important;
    overflow: hidden;

    & video {
      max-height: 368px;
      width: inherit !important;
      height: inherit !important;

      @media only screen and (max-width: 1280px) {
        max-height: 532px;
        width: 100% !important;
        margin: 100px 0px 60px;
      }

      @media only screen and (max-width: 768px) {
        max-height: 395px;
        margin: 0px 0px 40px;
      }

      @media only screen and (max-width: 600px) {
        width: 100vw !important;
        max-height: 395px;
        margin: 0px 0px 36px;
      }
    }
  }
`;

const LeftArea = styled.div`
  width: 100%;
  max-height: 368px;
  margin: 0px 73px 0px 0px;
`;

const RightArea = styled.div`
  max-width: 425px;
  width: 100%;
  white-space: pre-wrap;
`;

const ButtonStyle = styled(Button)`
  & {
    width: fit-content;
    padding: 18px 20px 18px 28px;
    background: rgb(238, 243, 255);
    border-radius: 8px;

    &:hover,
    &:focus {
      background: rgb(198, 209, 255);
    }

    @media only screen and (max-width: 1280px) {
      text-align: center;
    }

    @media only screen and (max-width: 768px) {
      border-radius: 6px;
    }

    @media only screen and (max-width: 600px) {
      padding: 14px 18px;
    }
  }

  & .text {
    display: flex;
    align-items: center;

    font-weight: 600;
    font-size: 2.8rem;
    line-height: 33px;
    color: rgb(23, 60, 254);

    @media only screen and (max-width: 768px) {
      font-size: 2rem;
      line-height: 24px;

      & svg {
        display: none;
      }
    }

    @media only screen and (max-width: 600px) {
      font-size: 1.6rem;
      line-height: 19px;
    }

    & svg {
      margin-left: 8px;
    }
  }
`;

const Conntent = styled.div`
  @media only screen and (max-width: 1280px) {
    width: 100%;
    text-align: center;
  }
`;

export default function Scanning() {
  const { t } = useTranslation();
  const [screenSize] = useAtom(screenSizeAtom);
  const [url, setUrl] = useState("/home_video_pc.mp4");

  const videoUrl = (props: IScreenSizeAtom) => {
    switch (props) {
      case "tablet":
        setUrl("/home_video3_tablet.mp4");
        break;
      case "mobile":
        setUrl("/home_video3_tablet.mp4");
        break;
      default:
        setUrl("/home_video3_pc.mp4");
        break;
    }
  };

  useEffect(() => {
    videoUrl(screenSize);
  }, [screenSize]);

  return (
    <Section>
      <HalfArea>
        {screenSize === "bigDesctop" ? (
          <>
            <LeftArea>
              <ReactPlayer
                url={url}
                onContextMenu={(e: React.MouseEvent<HTMLDivElement>) =>
                  e.preventDefault()
                }
                className="video"
                muted
                playing
                volume={0}
                loop
                controls={false}
              />
            </LeftArea>

            <RightArea>
              <strong>{t("scanning.text1")}</strong>
              <h2>
                {t("scanning.text2")}
                <br />
                {t("scanning.text3")}
              </h2>

              <p>
                {t("scanning.text4")}
                <br />
                {t("scanning.text5")}
              </p>

              <ButtonStyle>
                <span className="text">
                  {t("scanning.button")}
                  <svg
                    width="28"
                    height="29"
                    viewBox="0 0 28 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.937 21.6749L9.50781 20.2458L15.2828 14.4708L9.50781 8.69577L10.937 7.2666L18.1411 14.4708L10.937 21.6749Z"
                      fill="#173CFE"
                    ></path>
                  </svg>
                </span>
              </ButtonStyle>
            </RightArea>
          </>
        ) : (
          <>
            <Conntent>
              <strong>{t("scanning.text1")}</strong>
              <h2>
                {t("scanning.text2")}
                <br />
                {t("scanning.text3")}
              </h2>

              <p>
                {t("scanning.text4")}
                <br />
                {t("scanning.text5")}
              </p>

              <ReactPlayer
                url={url}
                onContextMenu={(e: React.MouseEvent<HTMLDivElement>) =>
                  e.preventDefault()
                }
                className="video"
                muted
                playing
                volume={0}
                loop
                controls={false}
              />

              <ButtonStyle className="mobile">
                <span className="text">
                  {t("scanning.button")}
                  <svg
                    width="28"
                    height="29"
                    viewBox="0 0 28 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.937 21.6749L9.50781 20.2458L15.2828 14.4708L9.50781 8.69577L10.937 7.2666L18.1411 14.4708L10.937 21.6749Z"
                      fill="#173CFE"
                    ></path>
                  </svg>
                </span>
              </ButtonStyle>
            </Conntent>
          </>
        )}
      </HalfArea>
    </Section>
  );
}
