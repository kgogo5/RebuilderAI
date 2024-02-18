import styled from "@emotion/styled";
import ReactPlayer from "react-player";

const Wrap = styled.section`
  position: relative;
  width: 100%;
  height: 150vh;
  background: rgb(0, 0, 0);

  &.active {
    position: absolute;
    height: 150vh;
    background: linear-gradient(
      45deg,
      rgb(29, 92, 255) 18.46%,
      rgb(47, 208, 179) 100%
    );

    & .video {
      visibility: hidden;
    }

    & .inner {
      position: absolute;
      height: 150vh;
    }
  }

  @media only screen and (max-width: 768px) {
    padding-top: 65px;
  }

  & .video {
    width: 100% !important;
    height: 58vh !important;
    clip-path: inset(4px);
  }

  & .inner {
    position: fixed;
    width: 100%;
    height: 100vh;
    display: flex;
    object-fit: cover;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    z-index: 100;
    overflow: hidden;
  }
`;

const Text = styled.div`
  position: fixed;
  left: 0px;
  width: 100%;
  text-align: center;

  h1 {
    font-weight: 800;
    font-size: 7rem;
    line-height: 130.5%;
    text-align: center;
    color: rgb(255, 255, 255);
  }
`;

export default function Transformation({
  scrollPosition,
}: {
  scrollPosition: number;
}) {
  const animationStyle = {
    transition: `0.1s`,
    transform: `matrix(${
      scrollPosition <= 1
        ? 1
        : scrollPosition * 0.0333333 <= 25
        ? scrollPosition * 0.0333333
        : 25
    }, 0, 0, ${
      scrollPosition <= 1
        ? 1
        : scrollPosition * 0.0333333 <= 25
        ? scrollPosition * 0.0333333
        : 25
    }, 0, 0)`,
    filter: `blur(${
      scrollPosition * 0.0333333 <= 7.2 ? scrollPosition * 0.0333333 : 0.5
    }rem)`,
  };

  const animationText = {
    opacity: `${
      1 - scrollPosition * 0.005833 >= 0 ? 1 - scrollPosition * 0.005833 : 0
    }`,
  };

  return (
    <Wrap className={scrollPosition > 400 ? "active" : ""}>
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
      <Text style={animationText}>
        <h1>3D Digital Transformation</h1>
      </Text>
    </Wrap>
  );
}
