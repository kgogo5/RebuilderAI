import styled from "@emotion/styled";
import { useAtom } from "jotai";
import ReactPlayer from "react-player";
import { scrollPosition } from "../lib/atom";

const Wrap = styled.section`
  position: relative;
  width: 100%;
  height: 150vh;
  background: rgb(0, 0, 0);
  overflow: hidden;

  @media only screen and (max-width: 768px) {
  }
  & .video {
    @media only screen and (max-width: 600px) {
      width: 320px !important;
      height: auto !important;
    }
  }

  &.active {
    background: linear-gradient(
      45deg,
      rgb(29, 92, 255) 18.46%,
      rgb(47, 208, 179) 100%
    );

    & .video {
      visibility: hidden;
    }

    & > .inner {
      position: absolute;
      height: 150vh;
    }
  }

  & > .inner {
    position: fixed;
    width: 100%;
    height: 100vh;
    display: flex;
    object-fit: cover;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    z-index: 1;
    overflow: hidden;
  }
`;

const Text = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  z-index: 100;

  &.active {
    position: absolute;
  }

  h1 {
    font-weight: 800;
    font-size: 7rem;
    line-height: 130.5%;
    text-align: center;
    color: rgb(255, 255, 255);
    @media only screen and (max-width: 1280px) {
      font-size: 5.6rem;
    }
    @media only screen and (max-width: 768px) {
      font-size: 4.8rem;
    }
    @media only screen and (max-width: 600px) {
      font-size: 2.8rem;
      white-space: pre-wrap;
    }
  }

  h2 {
    font-weight: 800;
    font-size: 5rem;
    line-height: 130.5%;
    text-align: center;
    color: rgb(255, 255, 255);
    margin-bottom: 83px;

    @media only screen and (max-width: 768px) {
      margin-bottom: 42px;
    }

    @media only screen and (max-width: 600px) {
      font-size: 1.8rem;
      margin-bottom: 14px;
    }
  }
`;

export default function Transformation() {
  const [scroll] = useAtom(scrollPosition);
  const animationStyle = {
    transition: `0.1s`,
    transform: `matrix(${
      scroll <= 1 ? 1 : scroll * 0.0333333 <= 25 ? scroll * 0.0333333 : 25
    }, 0, 0, ${
      scroll <= 1 ? 1 : scroll * 0.0333333 <= 25 ? scroll * 0.0333333 : 25
    }, 0, 0)`,
    filter: `blur(${scroll * 0.0333333 <= 7.2 ? scroll * 0.0333333 : 0.5}rem)`,
  };

  const inAnimationText = {
    opacity: `${Math.max(1 - (scroll / 225) * (1 - 0.0625), 0.0625)}`,
  };

  const outAnimationText = {
    opacity: `${Math.min((scroll - 225) / (345 - 225), 1)}`,
  };

  return (
    <Wrap className={scroll > 426 ? "active" : ""}>
      <div className="inner" style={animationStyle}>
        <ReactPlayer
          onContextMenu={(e: React.MouseEvent<HTMLDivElement>) =>
            e.preventDefault()
          }
          className="video"
          url="/main_video.mp4"
          muted
          playing
          volume={0}
          loop
          controls={false}
        />
      </div>
      {scroll > 226 ? (
        <>
          <Text
            className={scroll > 426 ? "active" : ""}
            style={outAnimationText}
          >
            <h2>3D Digital Transformation</h2>
            <h1>
              The Next Generation of <br />
              Digital Transformation
            </h1>
          </Text>
        </>
      ) : (
        <>
          <Text style={inAnimationText}>
            <h1>3D Digital Transformation</h1>
          </Text>
        </>
      )}
    </Wrap>
  );
}
