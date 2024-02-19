import styled from "@emotion/styled";
import { scrollPosition } from "../lib/atom";
import { useAtom } from "jotai";
import ReactPlayer from "react-player";

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

  & > .inner {
    width: 200px;
    display: flex;
    flex-direction: column;
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
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 140%;
    color: rgb(0, 0, 0);
    margin-bottom: 10px;
  }

  & span {
    margin-bottom: 12px;
    display: block;
    font-size: 4.8rem;
    line-height: 140%;
    color: rgb(0, 0, 0);
    font-weight: 600;
    transition: 0.4s;

    & + span {
      color: rgb(189, 193, 199);
      font-weight: 500;
    }
  }
`;

const RightArea = styled.div`
  padding-top: 120px;
  padding-bottom: 200px;
  display: flex;
  flex-direction: column;

  & > div {
    display: flex;
    flex-direction: column;
  }

  p {
    font-weight: 500;
    font-size: 2.6rem;
    line-height: 170%;
    color: rgb(0, 0, 0);
    margin-bottom: 60px;
  }

  img {
    width: 100%;
  }
`;

const HalfBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;

  & .cover {
  }

  & .video {
    max-width: 556px;
    width: 100% !important;
    height: auto !important;
    clip-path: inset(4px);
  }
`;

export default function Optimization() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scroll] = useAtom(scrollPosition);

  return (
    <Section>
      <Wrap>
        <div className="inner">
          <div>
            <StickySide>
              <div className="inner">
                <StickyText
                // className={scroll}
                >
                  <strong>3D model</strong>
                  <span>3D 최적화</span>
                  <span>사용하기</span>
                </StickyText>
              </div>
            </StickySide>
            <RightArea>
              <p>
                3D 파일의 품질을 유지한 채 원하는 용량과 폴리곤으로 최적화하여
                제공합니다.
                <br />
                로딩 시간을 최소화하고 용량 제한 없이 다양한 플랫폼에 업로드
                해보세요.
              </p>
              <img
                src="/images/optimization01.png"
                alt="original 3d shoes image"
              />
              <p>
                리빌더AI의 3D 뷰어를 이용하여, 간편하게 색감, 그림자, 빛의
                세기를 원하는 대로 조절할 수 있습니다.
                <br />
                3D 제품에 태그를 추가하여 공유할 수 있으며, 편집한 3D 뷰어는 웹
                쇼핑몰에도 사용할 수 있습니다.
              </p>
              <HalfBox>
                <div className="layer">
                  <ReactPlayer
                    onContextMenu={(e: React.MouseEvent<HTMLDivElement>) =>
                      e.preventDefault()
                    }
                    className="video"
                    url="/service_video_pc_ko.mp4"
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

                <div className="layer">
                  <ReactPlayer
                    onContextMenu={(e: React.MouseEvent<HTMLDivElement>) =>
                      e.preventDefault()
                    }
                    className="video"
                    url="/service_video2_pc_ko.mp4"
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
          </div>
        </div>
      </Wrap>
    </Section>
  );
}
