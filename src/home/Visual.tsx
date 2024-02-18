import styled from "@emotion/styled";
import ReactPlayer from "react-player";
import { IScreenSizeAtom, screenSizeAtom } from "../lib/atom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { keyframes } from "@emotion/react";

const bounce = keyframes`
  20% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30%);
  }
  60% {
    transform: translateY(0);
  }
  80% {
    transform: translateY(-30%);
  }
  to {
    transform: translateY(0);
  }
`;

const Wrap = styled.section`
  padding-top: 95px;
  min-height: 100vh;

  @media only screen and (max-width: 768px) {
    padding-top: 65px;
  }

  & .video {
    width: 100% !important;
    height: 58vh !important;
    clip-path: inset(4px);
  }
`;

const TextArea = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (min-width: 1200px) {
    max-width: 1200px;
  }

  h1 {
    margin: 24px 0 20px;
    font-weight: 700;
    font-size: 5.8rem;
    line-height: 130%;
    color: rgb(0, 0, 0);

    @media (max-width: 1280px) {
      font-size: 5rem;
      margin: 20px 0px;
    }

    @media only screen and (max-width: 768px) {
      font-size: 4.8rem;
    }

    @media only screen and (max-width: 600px) {
      font-size: 2.4rem;
    }
  }
  p {
    font-weight: 400;
    font-size: 2.8rem;
    line-height: 120%;
    color: rgb(0, 0, 0);
    margin-bottom: 26px;
    white-space: pre-wrap;

    @media only screen and (max-width: 768px) {
      font-size: 2.4rem;
    }

    @media only screen and (max-width: 600px) {
      font-size: 1.8rem;
    }
  }
`;

const ArrowStyle = styled.button`
  animation: ${bounce} 2s ease infinite;
  & svg {
    width: 45px;
  }
`;

export default function Visual() {
  const [screenSize] = useAtom(screenSizeAtom);
  const [url, setUrl] = useState("/home_video_pc.mp4");

  const videoUrl = (props: IScreenSizeAtom) => {
    switch (props) {
      case "tablet":
        setUrl("/home_video_tablet.mp4");
        break;
      case "mobile":
        setUrl("/home_video_mobile.mp4");
        break;
      default:
        setUrl("/home_video_pc.mp4");
        break;
    }
  };

  useEffect(() => {
    videoUrl(screenSize);
  }, [screenSize]);

  return (
    <Wrap>
      {screenSize[0] !== "tablet" && screenSize[0] !== "mobile" && (
        <ReactPlayer
          onContextMenu={(e: React.MouseEvent<HTMLDivElement>) =>
            e.preventDefault()
          }
          className="video"
          url={url}
          muted
          playing
          volume={0}
          loop
          controls={false}
        />
      )}{" "}
      {screenSize[0] === "tablet" && (
        <ReactPlayer
          onContextMenu={(e: React.MouseEvent<HTMLDivElement>) =>
            e.preventDefault()
          }
          className="video"
          url={url}
          muted
          playing
          volume={0}
          loop
          controls={false}
        />
      )}
      {screenSize[0] === "mobile" && (
        <ReactPlayer
          onContextMenu={(e: React.MouseEvent<HTMLDivElement>) =>
            e.preventDefault()
          }
          className="video"
          url={url}
          muted
          playing
          volume={0}
          loop
          controls={false}
        />
      )}
      <TextArea>
        <h1>Rebuild your world</h1>
        <p>
          Our mission is to bring the real world{" "}
          {(screenSize === "mobile" || screenSize === "tablet") && <br />}into
          {screenSize !== "mobile" && screenSize !== "tablet" && <br />} virtual
          space with AI technology.
        </p>
        <ArrowStyle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="55"
            height="28"
            viewBox="0 0 55 28"
            fill="none"
          >
            <path opacity="0.8" d="M5 5L27.5 24L50 5" stroke="#BDC1C7" />
          </svg>
        </ArrowStyle>
      </TextArea>
    </Wrap>
  );
}
