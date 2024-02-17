import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { IScreenSizeAtom, screenSizeAtom } from "../lib/atom";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { keyframes } from "@emotion/react";
import {
  technology,
  visionLeftKo,
  visionLeftEn,
  visionRightKo,
  visionRightEn,
} from "../../images";
import Section from "../components/Section";

const bannermoveleft = keyframes`
    0% {
        transform: translate(-50%)
    }
    to {
        transform: translate(0)
    }
`;

const bannermoveright = keyframes`
    0% {
        transform: translate(0)
    }
    to {
        transform: translate(-50%)
    }
`;

const HalfArea = styled.div`
  display: flex;
  overflow: hidden;

  @media (max-width: 1280px) {
    align-items: center;
    flex-direction: column;
  }
`;

const LeftArea = styled.div`
  padding-top: 45px;

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
    font-size: 4.8rem;
    line-height: 140%;
    color: rgb(40, 45, 50);
    margin-bottom: 40px;

    @media (max-width: 1280px) {
      font-size: 3.6rem;
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
`;

const Stack = styled.ul`
  max-width: 870px;
  display: flex;
  flex-flow: wrap;
  gap: 22px;

  @media (max-width: 1280px) {
    justify-content: center;
  }

  @media only screen and (max-width: 768px) {
    max-width: 478px;
    gap: 14px;
  }

  li {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    width: fit-content;
    padding: 14px 24px;
    background: rgb(246, 247, 248);
    border-radius: 100px;

    @media only screen and (max-width: 768px) {
      padding: 8px 16px;
    }

    & img {
      width: 36px;
      height: auto;
      margin-right: 10px;
    }

    & .itemTitle {
      font-weight: 600;
      font-size: 2.8rem;
      line-height: 150%;
      color: rgb(111, 117, 123);

      @media only screen and (max-width: 768px) {
        font-size: 1.8rem;
      }
    }
  }
`;

const RightArea = styled.div`
  max-width: 432px;
  .video {
    width: 100% !important;
    height: auto !important;
    clip-path: inset(4px);

    @media only screen and (max-width: 1280px) {
      max-width: 363px;
    }
  }
`;

const AniStack = styled.div`
  height: 40px;
  position: relative;
  width: 100%;

  & > div {
    display: flex;
    position: absolute;

    &.bannermoveleft {
      animation: ${bannermoveleft} 25s linear infinite;
    }

    &.bannermoveright {
      margin-top: 10px;
      animation: ${bannermoveright} 25s linear infinite;
    }

    & img {
      height: 40px;
      margin: 0px 5px;
    }
  }
`;

export default function Vision() {
  const { t, i18n } = useTranslation();
  const [screenSize] = useAtom(screenSizeAtom);
  const [url, setUrl] = useState("/home_video2_pc.mp4");

  const videoUrl = (props: IScreenSizeAtom) => {
    switch (props) {
      case "bigDesctop":
        setUrl("/home_video2_pc.mp4");
        break;
      default:
        setUrl("/home_video2_tablet.mp4");
        break;
    }
  };

  useEffect(() => {
    videoUrl(screenSize);
  }, [screenSize]);

  return (
    <Section>
      <HalfArea>
        <LeftArea>
          <strong>{t("vision.text1")}</strong>
          <h2>
            {t("vision.text2")}{" "}
            {screenSize !== "tablet" && screenSize !== "mobile" && <br />}
            {t("vision.text3")}
          </h2>
          {screenSize !== "mobile" ? (
            <Stack>
              {...Array(8)
                .fill("")
                .map((_, index) => {
                  return (
                    <li key={index}>
                      <img
                        src={technology[index]}
                        alt={t(`vision.stack${index + 1}`)}
                      />
                      <span className="itemTitle">
                        {t(`vision.stack${index + 1}`)}
                      </span>
                    </li>
                  );
                })}
            </Stack>
          ) : (
            <>
              {i18n.language === "ko" ? (
                <>
                  <AniStack>
                    <div className="bannermoveleft">
                      {visionLeftKo.map((item, index) => {
                        return (
                          <img key={index} src={item} alt="banner image" />
                        );
                      })}
                    </div>
                  </AniStack>
                  <AniStack>
                    <div className="bannermoveright">
                      {visionRightKo.map((item, index) => {
                        return (
                          <img key={index} src={item} alt="banner image" />
                        );
                      })}
                    </div>
                  </AniStack>
                </>
              ) : (
                <>
                  <AniStack>
                    <div className="bannermoveleft">
                      {visionLeftEn.map((item, index) => {
                        return (
                          <img key={index} src={item} alt="banner image" />
                        );
                      })}
                    </div>
                  </AniStack>
                  <AniStack>
                    <div className="bannermoveright">
                      {visionRightEn.map((item, index) => {
                        return (
                          <img key={index} src={item} alt="banner image" />
                        );
                      })}
                    </div>
                  </AniStack>
                </>
              )}
            </>
          )}
        </LeftArea>

        <RightArea>
          <ReactPlayer
            url={url}
            onContextMenu={(e: React.MouseEvent<HTMLDivElement>) =>
              e.preventDefault()
            }
            class="video"
            muted
            playing
            volume={0}
            loop
            controls={false}
          />
        </RightArea>
      </HalfArea>
    </Section>
  );
}
