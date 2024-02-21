import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { screenSizeAtom, scrollPosition } from "../lib/atom";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 400px;
  background: linear-gradient(rgb(0, 0, 0) 65%, rgb(0, 0, 229) 35%);
  overflow: hidden;

  @media only screen and (max-width: 1024px) {
    height: 280px;
  }

  @media only screen and (max-width: 768px) {
    height: 160px;
  }

  @media only screen and (max-width: 600px) {
    height: 140px;
  }

  & strong {
    color: rgb(93, 108, 250);
    font-size: 2rem;
    font-weight: 600;
    line-height: 140%;

    @media only screen and (max-width: 1024px) {
      font-size: 1.3rem;
    }

    @media only screen and (max-width: 768px) {
      font-size: 0.8rem;
    }

    @media only screen and (max-width: 600px) {
      display: none;
    }
  }

  & h1 {
    color: rgb(255, 255, 255);
    font-size: 5.6rem;
    font-weight: 600;
    line-height: 120%;

    @media only screen and (max-width: 1024px) {
      font-size: 3.7rem;
    }

    @media only screen and (max-width: 768px) {
      font-size: 2.2rem;
    }

    @media only screen and (max-width: 600px) {
      font-size: 2rem;
    }
  }

  & p {
    color: rgb(189, 193, 199);
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 140%;

    @media only screen and (max-width: 1024px) {
      margin-top: 8px;
      font-size: 1.6rem;
    }

    @media only screen and (max-width: 768px) {
      margin-top: 8px;
      font-size: 1rem;
    }
  }
`;

const Wrap = styled.div`
  margin: 0 auto;
  padding: 0 24px;
  max-width: 1200px;

  @media only screen and (max-width: 768px) {
    padding: 0px 60px;
  }

  @media only screen and (max-width: 600px) {
    padding: 0px 20px;
  }

  & > .inner {
    position: absolute;
    top: 50%;
    transform: translate(0px, -50%);
    z-index: 1;
    gap: 48px;

    @media only screen and (max-width: 1024px) {
      gap: 32px;
    }

    @media only screen and (max-width: 768px) {
      gap: 19px;
    }

    @media only screen and (max-width: 600px) {
      left: 50%;
      transform: translate(-50%, -50%);
      gap: 8px;
      -webkit-box-align: center;
      align-items: center;
      text-align: center;
    }
  }
`;

const Background = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  background: url("/images/vrin_bg.png") 0% 0% / cover no-repeat;

  @media only screen and (max-width: 600px) {
    background: url("/images/vrin_bg_mobile.png") 0% 0% / cover no-repeat;
  }
`;

const TopText = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  @media only screen and (max-width: 1024px) {
    gap: 13px;
  }

  @media only screen and (max-width: 768px) {
    gap: 8px;
  }

  & svg {
    width: 90px;
    height: 90px;

    @media only screen and (max-width: 1024px) {
      width: 66px;
      height: 66px;
    }

    @media only screen and (max-width: 768px) {
      width: 40px;
      height: 40px;
    }

    @media only screen and (max-width: 600px) {
      display: none;
    }
  }
`;

const ButtonStyle = styled(Button)`
  margin-top: 48px;
  & {
    max-width: 194px;
    border-radius: 4px;
    background: rgb(230, 232, 235);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 16px 0px;
    color: rgb(55, 55, 204);
    padding: 12px 16px;
    gap: 8px;

    &:hover,
    &:focus {
      background: rgb(198, 209, 255);
    }

    @media only screen and (max-width: 1280px) {
      margin-top: 32px;
      text-align: center;
    }

    @media only screen and (max-width: 1024px) {
      max-width: 130px;
      border-radius: 3px;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 11px 0px;
      padding: 8px 11px;
    }

    @media only screen and (max-width: 768px) {
      margin-top: 19px;
      max-width: 78px;
      border-radius: 2px;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 7px 0px;
      padding: 5px 7px;
      gap: 3px;
    }

    @media only screen and (max-width: 600px) {
      padding: 14px 18px;
    }
  }

  & .text {
    display: flex;
    align-items: center;
    font-size: 2rem;
    font-weight: 600;
    line-height: 140%;

    @media only screen and (max-width: 1024px) {
      font-size: 1.3rem;
    }

    @media only screen and (max-width: 768px) {
      font-size: 0.8rem;

      & svg {
        display: none;
      }
    }

    & svg {
      margin-left: 0px;

      & path {
        fill: rgb(55, 55, 204);
      }
    }
  }
`;

const MobileWrap = styled.a`
  position: relative;
  padding: 0px 20px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  z-index: 10;

  & > .text {
    margin-top: 8px;
    display: flex;
    align-items: center;
    color: rgb(255, 255, 255);
    font-size: 0.8rem;
    gap: 2px;
  }

  & svg {
    width: 8px;
    height: 8px;
    & path {
      fill: rgb(255, 255, 255);
    }
  }
`;

export default function Vrin() {
  const { t, i18n } = useTranslation();
  const [scroll] = useAtom(scrollPosition);
  const [screenSize] = useAtom(screenSizeAtom);
  const [offsetTop, setOffsetTop] = useState(2530);

  const backgroundMove = {
    backgroundPosition: `0% ${
      (scroll - offsetTop) * 0.0909 > 100 ? 100 : (scroll - offsetTop) * 0.0909
    }%`,
  };

  const backgroundMove2 = {
    backgroundPosition: `0% ${
      (scroll - 2170) * 0.1111 > 100 ? 100 : (scroll - 2170) * 0.1111
    }%`,
  };

  useEffect(() => {
    if (screenSize === "tablet") {
      setOffsetTop(1640);
    } else if (screenSize === "notebook") {
      setOffsetTop(2140);
    } else if (screenSize === "desctop") {
      setOffsetTop(2340);
    } else {
      setOffsetTop(2530);
    }
  }, []);

  return (
    <Section>
      {screenSize !== "mobile" ? (
        <>
          <Wrap>
            <div className="inner">
              <TopText>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="104"
                  height="104"
                  viewBox="0 0 104 104"
                  fill="none"
                >
                  <rect
                    x="1.44444"
                    y="1.44444"
                    width="101.111"
                    height="101.111"
                    rx="22.2222"
                    fill="url(#paint0_linear_509_3745)"
                  ></rect>
                  <rect
                    x="1.44444"
                    y="1.44444"
                    width="101.111"
                    height="101.111"
                    rx="22.2222"
                    stroke="#282D32"
                    stroke-width="1.11111"
                  ></rect>
                  <path
                    d="M90.3675 72.6545C91.3741 74.1471 90.3047 76.1582 88.5044 76.1582L77.0715 76.1582C76.3244 76.1582 75.6261 75.7869 75.2084 75.1675L45.6552 31.3473C44.6486 29.8547 45.718 27.8436 47.5183 27.8436L58.9513 27.8436C59.6984 27.8436 60.3966 28.2149 60.8143 28.8343L90.3675 72.6545Z"
                    fill="white"
                  ></path>
                  <g filter="url(#filter0_d_509_3745)">
                    <path
                      d="M60.707 53.6971C60.707 54.9382 59.7009 55.9443 58.4598 55.9443L57.3362 55.9443C56.0952 55.9443 55.0891 54.9382 55.0891 53.6971L55.0891 30.6522C55.0891 29.4111 56.0952 28.405 57.3362 28.405L58.4598 28.405C59.7009 28.405 60.707 29.4111 60.707 30.6522L60.707 53.6971Z"
                      fill="white"
                    ></path>
                  </g>
                  <path
                    d="M60.707 73.911C60.707 75.1521 59.7009 76.1582 58.4598 76.1582L47.2239 76.1582C45.9828 76.1582 44.9767 75.1521 44.9767 73.911L44.9767 30.0908C44.9767 28.8497 45.9828 27.8436 47.2239 27.8436L59.5834 27.8436C60.204 27.8436 60.707 28.3466 60.707 28.9672L60.707 73.911Z"
                    fill="white"
                  ></path>
                  <g filter="url(#filter1_d_509_3745)">
                    <path
                      d="M58.3286 72.65C59.3402 74.1421 58.2713 76.1582 56.4686 76.1582L53.0885 76.1582C52.3433 76.1582 51.6466 75.7888 51.2284 75.172L37.2427 54.5428C36.2311 53.0507 37.3 51.0346 39.1028 51.0346L42.4829 51.0346C43.2281 51.0346 43.9248 51.404 44.3429 52.0208L58.3286 72.65Z"
                      fill="white"
                    ></path>
                  </g>
                  <path
                    d="M59.8049 74.4064C60.3082 75.1526 59.7734 76.1582 58.8733 76.1582L45.3273 76.1582C44.5802 76.1582 43.882 75.7869 43.4643 75.1675L13.9111 31.3473C12.9045 29.8547 13.9739 27.8436 15.7742 27.8436L27.2071 27.8436C27.9542 27.8436 28.6525 28.2149 29.0702 28.8343L59.8049 74.4064Z"
                    fill="white"
                  ></path>
                  <defs>
                    <filter
                      id="filter0_d_509_3745"
                      x="50.5955"
                      y="22.7873"
                      width="16.8531"
                      height="38.775"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood
                        flood-opacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      ></feColorMatrix>
                      <feOffset dx="1.1236"></feOffset>
                      <feGaussianBlur stdDeviation="2.80899"></feGaussianBlur>
                      <feComposite in2="hardAlpha" operator="out"></feComposite>
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.0838542 0 0 0 0 0.0838542 0 0 0 0 0.670833 0 0 0 0.5 0"
                      ></feColorMatrix>
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_509_3745"
                      ></feBlend>
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_509_3745"
                        result="shape"
                      ></feBlend>
                    </filter>
                    <filter
                      id="filter1_d_509_3745"
                      x="31.7954"
                      y="45.4162"
                      width="33.1031"
                      height="36.36"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood
                        flood-opacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      ></feColorMatrix>
                      <feOffset dx="0.561798"></feOffset>
                      <feGaussianBlur stdDeviation="2.80899"></feGaussianBlur>
                      <feComposite in2="hardAlpha" operator="out"></feComposite>
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.0823529 0 0 0 0 0.0823529 0 0 0 0 0.670588 0 0 0 0.7 0"
                      ></feColorMatrix>
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_509_3745"
                      ></feBlend>
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_509_3745"
                        result="shape"
                      ></feBlend>
                    </filter>
                    <linearGradient
                      id="paint0_linear_509_3745"
                      x1="42.8333"
                      y1="44.5"
                      x2="26.1667"
                      y2="102"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#05070E"></stop>
                      <stop offset="1" stop-color="#000096"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <div>
                  <strong>{t("service.vrin.text1")}</strong>
                  <h1>{t("service.vrin.text2")}</h1>
                </div>
              </TopText>

              <p>
                {t("service.vrin.text3")}
                <br />
                {t("service.vrin.text4")}
                {i18n.language === "en" && (
                  <>
                    <br />
                    {t("service.vrin.text5")}
                  </>
                )}
              </p>

              <ButtonStyle
                className="mobile"
                aria-label="Go to VRIN Website"
                onClick={() => window.open("https://vrin.co.kr/")}
              >
                <span className="text">
                  {t("service.vrin.button")}
                  <svg
                    focusable="false"
                    aria-hidden="true"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    data-testid="ArrowForwardIosIcon"
                  >
                    <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
                  </svg>
                </span>
              </ButtonStyle>
            </div>
          </Wrap>
          <Background style={backgroundMove} />
        </>
      ) : (
        <>
          <MobileWrap
            href="https://vrin.co.kr/"
            target="_blank"
            aria-label="Go to VRIN Website"
          >
            <h1>{t("service.vrin.text2")}</h1>

            <p>
              {t("service.vrin.text3")}
              <br />
              {t("service.vrin.text4")}
              {i18n.language === "en" && (
                <>
                  <br />
                  {t("service.vrin.text5")}
                </>
              )}
            </p>

            <span className="text">
              {t("service.vrin.button")}
              <svg
                focusable="false"
                aria-hidden="true"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                data-testid="ArrowForwardIosIcon"
              >
                <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
              </svg>
            </span>
          </MobileWrap>
          <Background style={backgroundMove2} />
        </>
      )}
    </Section>
  );
}
