import styled from "@emotion/styled";
import Section from "../components/Section";
import { screenSizeAtom } from "../lib/atom";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

const HalfArea = styled.div`
  margin: 300px -30px 300px 0;
  display: flex;
  overflow: hidden;

  @media (max-width: 1280px) {
    margin-right: 0;
    align-items: center;
    flex-direction: column;
  }

  @media only screen and (max-width: 600px) {
    margin: 80px 0;
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
`;

const LeftArea = styled.div`
  min-width: 540px;
  margin-right: 72px;
  @media only screen and (max-width: 1280px) {
    min-width: auto;
    width: 100%;
    margin: 0;
  }
`;

const RightArea = styled.div`
  max-width: 425px;
  width: 100%;

  @media only screen and (max-width: 1280px) {
    max-width: 835px;
    text-align: center;

    & img {
      margin: 100px 0px 60px;
      width: 100%;
      display: block;
    }
  }

  @media only screen and (max-width: 600px) {
    & img {
      margin: 0 0 36px;
      /* width: 100vw; */
      display: block;
    }
  }
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

export default function Camera() {
  const { t } = useTranslation();
  const [screenSize] = useAtom(screenSizeAtom);

  return (
    <Section>
      <HalfArea>
        <LeftArea>
          <strong>{t("camera.text1")}</strong>
          <h2>
            {t("camera.text2")}
            <br />
            {t("camera.text3")}
          </h2>

          <p>
            {t("camera.text4")}
            <br />
            {t("camera.text5")}
          </p>

          {screenSize === "bigDesctop" && (
            <ButtonStyle>
              <span className="text">
                {t("camera.button")}
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
          )}
        </LeftArea>

        <RightArea>
          <img src="/camera.png" alt="camera image" />

          {screenSize !== "bigDesctop" && (
            <ButtonStyle>
              <span className="text">
                {t("camera.button")}
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
          )}
        </RightArea>
      </HalfArea>
    </Section>
  );
}
