import styled from "@emotion/styled";
import { screenSizeAtom } from "../lib/atom";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

const Wrap = styled.section`
  position: relative;
  height: 372px;
  background-image: url("/careers.png");
  background-size: cover;
  background-clip: border-box;
  background-position: center center;
  white-space: pre-wrap;

  @media only screen and (max-width: 768px) {
    height: 300px;
  }

  @media only screen and (max-width: 600px) {
    height: 280px;
    background-image: url("/careers_mobile.png");
  }

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
  }

  .inner {
    margin: 0 auto;
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;

    @media (min-width: 1200px) {
      max-width: 1200px;
    }

    @media only screen and (max-width: 768px) {
      align-items: center;
    }

    h2 {
      font-weight: 700;
      font-size: 4rem;
      line-height: 130%;
      color: rgb(255, 255, 255);
      z-index: 10;

      @media only screen and (max-width: 1280px) {
        font-size: 3.6rem;
      }

      @media only screen and (max-width: 768px) {
        font-size: 2.8rem;
        text-align: center;
        text-shadow: rgba(0, 0, 0, 0.22) 0px 4px 15px;
      }

      @media only screen and (max-width: 600px) {
        font-size: 2rem;
      }
    }

    p {
      font-weight: 500;
      font-size: 2.1rem;
      line-height: 130%;
      color: rgb(255, 255, 255);
      margin: 14px 0px;
      z-index: 10;
      white-space: pre-wrap;

      @media only screen and (max-width: 768px) {
        display: none;
      }
    }
  }
`;

const ButtonStyle = styled(Button)`
  & {
    width: fit-content;
    height: auto;
    padding: 20px 28px;
    background: rgb(23, 60, 243);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px;
    border-radius: 8px;

    &:hover,
    &:focus {
      background: rgb(69, 99, 254);
    }

    @media only screen and (max-width: 1280px) {
      text-align: center;
    }

    @media only screen and (max-width: 768px) {
      margin-top: 24px;
      padding: 16px 20px;
      border-radius: 6px;
    }

    @media only screen and (max-width: 600px) {
      padding: 14px 18px;
    }
  }

  & .text {
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 130%;
    color: rgb(255, 255, 255);

    & svg path {
      fill: rgb(255, 255, 255);
    }

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
      margin-left: 10px;
    }
  }
`;

export default function Careers() {
  const { t } = useTranslation();
  const [screenSize] = useAtom(screenSizeAtom);
  return (
    <Wrap>
      <div className="inner">
        <h2>
          {t("careers.text1")}{" "}
          {(screenSize === "tablet" || screenSize === "mobile") && <br />}
          {t("careers.text2")}
        </h2>

        <p>{t("careers.text3")}</p>

        <ButtonStyle>
          <span className="text">
            {t("careers.button")}
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
      </div>
    </Wrap>
  );
}
