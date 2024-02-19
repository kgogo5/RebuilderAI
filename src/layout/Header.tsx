import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { screenSizeAtom, scrollPosition } from "../lib/atom";
import { useAtom } from "jotai";
import clsx from "clsx";

const Wrap = styled.header`
  position: fixed;
  top: 0px;
  padding: 0 30px;
  width: 100%;
  height: 95px;
  overflow: hidden;
  background: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(230, 232, 235);
  transition: 0.2s;
  z-index: 999;

  &.black {
    background: rgb(0, 0, 0);
    border-bottom: 1px solid rgb(0, 0, 0);

    & .logo path {
      fill: rgb(255, 255, 255);
    }
  }

  @media only screen and (max-width: 768px) {
    padding: 0px 60px;
    height: 64px;
  }

  @media only screen and (max-width: 600px) {
    padding: 0px 20px;
  }

  &.hover {
    height: 181px;
  }

  &.open {
    height: 350px;
  }

  & > .inner {
    padding-top: 33px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: 10;

    @media (min-width: 1200px) {
      margin: 0 auto;
      max-width: 1200px;
      padding: 33px 30px 0;
    }

    @media only screen and (max-width: 768px) {
      width: 100%;
      height: 69px;
      padding: 0;

      .logo svg {
        width: 125px;
      }
    }
  }

  & .logo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & svg {
      width: 140px;
    }

    & path {
      fill: #000;
    }
  }
`;

const TooltipWrap = styled.ul`
  padding: 14px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;

  & li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 32px;
    text-align: center;
    &:hover {
      background-color: rgb(246, 247, 248);
    }

    & button {
      font-weight: 500;
      font-size: 1.7rem;
      line-height: 20px;
      cursor: pointer;
      color: rgb(111, 117, 123);

      &.active {
        color: rgb(0, 0, 0);
      }
    }
  }
`;

const Links = styled.ul`
  margin-top: 2px;
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;

  &.black {
    & span {
      color: rgb(255, 255, 255);
    }
  }

  & li {
    width: fit-content;
    font-weight: 500;
    font-size: 2rem;
    line-height: 24px;
    cursor: pointer;
    text-align: center;

    & + li {
      margin-left: 46px;
    }
  }
`;

const TooltipIcon = styled.div`
  margin-top: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: rgb(111, 117, 123);

  &.black {
    & svg path {
      fill: rgb(255, 255, 255);
    }

    &:hover {
      & svg path {
        fill: rgb(111, 117, 123);
      }
    }
  }

  &:hover {
    background-color: rgb(246, 247, 248);
    border-radius: 4px;
  }

  & path {
    fill: rgb(111, 117, 123);
  }
`;

const TwoDepth = styled.ul`
  position: absolute;
  left: 30px;
  right: 30px;
  top: 0;
  bottom: 0;
  justify-content: center;
  white-space: pre-wrap;
  z-index: 1;
  display: none;

  &.hover {
    top: 65px;
    margin-top: 48px;
    display: flex;
  }

  & li {
    position: relative;
    width: fit-content;
    font-weight: 400;
    font-size: 2rem;
    line-height: 24px;
    cursor: pointer;
    text-align: center;

    & + li {
      margin-left: 46px;
    }

    & a {
      display: block;
      & span {
        position: relative;
        width: fit-content;
        font-weight: 400;
        font-size: 2rem;
        line-height: 24px;
        cursor: pointer;
        text-align: center;
        color: rgb(0, 0, 0);
      }
    }
  }
`;

const DrawerButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 600px) {
  }

  .iconButton {
    margin: 0;
    padding: 0;
    width: 100%;
    height: auto;
  }
`;

const DrawerMenu = styled.div`
  padding-top: 33px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: -350px;
  transition: 0.2s;
  top: 0;

  &.open {
    margin-top: 0;
  }

  .title {
    font-size: 16px;
    line-height: 19px;
    font-weight: 500;
  }

  & .MuiListItem-root {
    position: relative;
    width: 100%;
    font-weight: 500;
    color: rgb(0, 0, 0);
    cursor: pointer;
  }

  & .MuiDrawer-paper {
    display: flex;
    flex-direction: column;
    gap: 32px;
    top: 64px;
    z-index: 900 !important;
  }

  & .lang {
    display: flex;
    flex-direction: row;

    & > button {
      padding: 0;
      display: inline-block;
      font-weight: 600;
      font-size: 1.6rem;
      line-height: 19px;
      color: rgb(111, 117, 123);
      cursor: pointer;

      &.active {
        color: rgb(0, 0, 0);
      }
    }

    & .langInner {
      display: flex;
      height: 12px;
      background-color: rgb(111, 117, 123);
      margin: 3px 8px;

      & hr {
        margin: 8px 0px;
        flex-shrink: 0;
        border-width: 0px thin 0px 0px;
        border-style: solid;
        border-color: rgba(0, 0, 0, 0.12);
        height: auto;
        align-self: stretch;
      }
    }
  }
`;

export default function Header() {
  const { t, i18n } = useTranslation();
  const [depth, setDepth] = useState(false);
  const [screenSize] = useAtom(screenSizeAtom);
  const [scroll] = useAtom(scrollPosition);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const changeLanguageHandler = (lang: "ko" | "en") => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    if (["bigDesctop", "desctop", "notebook"].includes(screenSize)) {
      setOpen(false);
    }
  }, [screenSize]);

  return (
    <Wrap
      className={clsx(
        depth ? "hover" : "",
        open ? "open" : "",
        scroll < 375 ? "black" : ""
      )}
      onMouseLeave={() => setDepth(false)}
    >
      <div className="inner">
        <Link to="/" className="logo" aria-label="Go Back to HomePage">
          <svg
            width="140"
            height="100%"
            viewBox="0 0 147 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 6.41609L13.043 0L19.5657 3.20682V5.62111L9.13134 10.7555V27.5845L6.52274 28.8687L0 25.6619L3.91414 16.9367L0 15.0116V6.41609ZM10.4336 11.5474L23.4791 5.13126L29.9993 8.33808V15.7815L26.0877 17.7042L29.9993 19.6292V27.5839L16.9563 34L10.4336 30.7932V11.5474Z"
              fill="white"
            ></path>
            <path
              d="M41.82 9.34H46.8C47.7067 9.34 48.4533 9.46667 49.04 9.72C49.6267 9.96 50.0867 10.2733 50.42 10.66C50.7667 11.0333 51.0067 11.46 51.14 11.94C51.2733 12.4067 51.34 12.86 51.34 13.3C51.34 13.7533 51.26 14.1933 51.1 14.62C50.94 15.0333 50.7067 15.4133 50.4 15.76C50.1067 16.0933 49.74 16.38 49.3 16.62C48.8733 16.8467 48.3933 16.9867 47.86 17.04L51.88 23.5H49.48L45.88 17.26H43.74V23.5H41.82V9.34ZM43.74 15.58H46.26C46.6333 15.58 47 15.5533 47.36 15.5C47.7333 15.4333 48.06 15.32 48.34 15.16C48.6333 15 48.8667 14.7733 49.04 14.48C49.2133 14.1733 49.3 13.78 49.3 13.3C49.3 12.82 49.2133 12.4333 49.04 12.14C48.8667 11.8333 48.6333 11.6 48.34 11.44C48.06 11.28 47.7333 11.1733 47.36 11.12C47 11.0533 46.6333 11.02 46.26 11.02H43.74V15.58ZM54.9466 19.42C54.9466 19.8333 55.0332 20.2133 55.2066 20.56C55.3932 20.8933 55.6332 21.18 55.9266 21.42C56.2199 21.66 56.5599 21.8467 56.9466 21.98C57.3332 22.1133 57.7332 22.18 58.1466 22.18C58.7066 22.18 59.1932 22.0533 59.6066 21.8C60.0199 21.5333 60.3999 21.1867 60.7466 20.76L62.1066 21.8C61.1066 23.0933 59.7066 23.74 57.9066 23.74C57.1599 23.74 56.4799 23.6133 55.8666 23.36C55.2666 23.1067 54.7532 22.76 54.3266 22.32C53.9132 21.8667 53.5932 21.34 53.3666 20.74C53.1399 20.1267 53.0266 19.4667 53.0266 18.76C53.0266 18.0533 53.1466 17.4 53.3866 16.8C53.6399 16.1867 53.9799 15.66 54.4066 15.22C54.8466 14.7667 55.3666 14.4133 55.9666 14.16C56.5666 13.9067 57.2199 13.78 57.9266 13.78C58.7666 13.78 59.4732 13.9267 60.0466 14.22C60.6332 14.5133 61.1132 14.9 61.4866 15.38C61.8599 15.8467 62.1266 16.38 62.2866 16.98C62.4599 17.5667 62.5466 18.1667 62.5466 18.78V19.42H54.9466ZM60.6266 17.98C60.6132 17.58 60.5466 17.2133 60.4266 16.88C60.3199 16.5467 60.1532 16.26 59.9266 16.02C59.6999 15.7667 59.4132 15.5733 59.0666 15.44C58.7332 15.2933 58.3399 15.22 57.8866 15.22C57.4466 15.22 57.0399 15.3067 56.6666 15.48C56.3066 15.64 55.9999 15.8533 55.7466 16.12C55.4932 16.3867 55.2932 16.6867 55.1466 17.02C55.0132 17.34 54.9466 17.66 54.9466 17.98H60.6266ZM64.6998 8.38H66.4998V15.38H66.5398C66.8598 14.8867 67.3198 14.5 67.9198 14.22C68.5198 13.9267 69.1598 13.78 69.8398 13.78C70.5732 13.78 71.2332 13.9067 71.8198 14.16C72.4198 14.4133 72.9265 14.7667 73.3398 15.22C73.7665 15.66 74.0932 16.1867 74.3198 16.8C74.5465 17.4 74.6598 18.0533 74.6598 18.76C74.6598 19.4667 74.5465 20.12 74.3198 20.72C74.0932 21.32 73.7665 21.8467 73.3398 22.3C72.9265 22.7533 72.4198 23.1067 71.8198 23.36C71.2332 23.6133 70.5732 23.74 69.8398 23.74C69.1998 23.74 68.5732 23.6 67.9598 23.32C67.3598 23.04 66.8865 22.6467 66.5398 22.14H66.4998V23.5H64.6998V8.38ZM69.6198 22.06C70.0998 22.06 70.5332 21.98 70.9198 21.82C71.3065 21.6467 71.6332 21.42 71.8998 21.14C72.1665 20.8467 72.3732 20.5 72.5198 20.1C72.6665 19.6867 72.7398 19.24 72.7398 18.76C72.7398 18.28 72.6665 17.84 72.5198 17.44C72.3732 17.0267 72.1665 16.68 71.8998 16.4C71.6332 16.1067 71.3065 15.88 70.9198 15.72C70.5332 15.5467 70.0998 15.46 69.6198 15.46C69.1398 15.46 68.7065 15.5467 68.3198 15.72C67.9332 15.88 67.6065 16.1067 67.3398 16.4C67.0732 16.68 66.8665 17.0267 66.7198 17.44C66.5732 17.84 66.4998 18.28 66.4998 18.76C66.4998 19.24 66.5732 19.6867 66.7198 20.1C66.8665 20.5 67.0732 20.8467 67.3398 21.14C67.6065 21.42 67.9332 21.6467 68.3198 21.82C68.7065 21.98 69.1398 22.06 69.6198 22.06ZM85.3264 23.5H83.5264V22.04H83.4864C83.2597 22.5467 82.8664 22.96 82.3064 23.28C81.7464 23.5867 81.0997 23.74 80.3664 23.74C79.8997 23.74 79.4597 23.6667 79.0464 23.52C78.6331 23.3867 78.2664 23.1733 77.9464 22.88C77.6397 22.5867 77.3931 22.2133 77.2064 21.76C77.0197 21.2933 76.9264 20.7467 76.9264 20.12V14.02H78.7264V19.62C78.7264 20.06 78.7864 20.44 78.9064 20.76C79.0264 21.0667 79.1864 21.32 79.3864 21.52C79.5864 21.7067 79.8131 21.8467 80.0664 21.94C80.3331 22.02 80.6064 22.06 80.8864 22.06C81.2597 22.06 81.6064 22 81.9264 21.88C82.2464 21.76 82.5264 21.5733 82.7664 21.32C83.0064 21.0533 83.1931 20.72 83.3264 20.32C83.4597 19.92 83.5264 19.4467 83.5264 18.9V14.02H85.3264V23.5ZM88.1797 14.02H89.9797V23.5H88.1797V14.02ZM87.7597 10.62C87.7597 10.26 87.8864 9.95333 88.1397 9.7C88.4064 9.43333 88.7197 9.3 89.0797 9.3C89.4397 9.3 89.7464 9.43333 89.9997 9.7C90.2664 9.95333 90.3997 10.26 90.3997 10.62C90.3997 10.98 90.2664 11.2933 89.9997 11.56C89.7464 11.8133 89.4397 11.94 89.0797 11.94C88.7197 11.94 88.4064 11.8133 88.1397 11.56C87.8864 11.2933 87.7597 10.98 87.7597 10.62ZM92.9844 8.38H94.7844V23.5H92.9844V8.38ZM107.149 23.5H105.349V22.14H105.309C104.962 22.6467 104.482 23.04 103.869 23.32C103.269 23.6 102.649 23.74 102.009 23.74C101.276 23.74 100.609 23.6133 100.009 23.36C99.4224 23.1067 98.9157 22.7533 98.4891 22.3C98.0757 21.8467 97.7557 21.32 97.5291 20.72C97.3024 20.12 97.1891 19.4667 97.1891 18.76C97.1891 18.0533 97.3024 17.4 97.5291 16.8C97.7557 16.1867 98.0757 15.66 98.4891 15.22C98.9157 14.7667 99.4224 14.4133 100.009 14.16C100.609 13.9067 101.276 13.78 102.009 13.78C102.689 13.78 103.329 13.9267 103.929 14.22C104.529 14.5 104.989 14.8867 105.309 15.38H105.349V8.38H107.149V23.5ZM102.229 22.06C102.709 22.06 103.142 21.98 103.529 21.82C103.916 21.6467 104.242 21.42 104.509 21.14C104.776 20.8467 104.982 20.5 105.129 20.1C105.276 19.6867 105.349 19.24 105.349 18.76C105.349 18.28 105.276 17.84 105.129 17.44C104.982 17.0267 104.776 16.68 104.509 16.4C104.242 16.1067 103.916 15.88 103.529 15.72C103.142 15.5467 102.709 15.46 102.229 15.46C101.749 15.46 101.316 15.5467 100.929 15.72C100.542 15.88 100.216 16.1067 99.9491 16.4C99.6824 16.68 99.4757 17.0267 99.3291 17.44C99.1824 17.84 99.1091 18.28 99.1091 18.76C99.1091 19.24 99.1824 19.6867 99.3291 20.1C99.4757 20.5 99.6824 20.8467 99.9491 21.14C100.216 21.42 100.542 21.6467 100.929 21.82C101.316 21.98 101.749 22.06 102.229 22.06ZM111.236 19.42C111.236 19.8333 111.322 20.2133 111.496 20.56C111.682 20.8933 111.922 21.18 112.216 21.42C112.509 21.66 112.849 21.8467 113.236 21.98C113.622 22.1133 114.022 22.18 114.436 22.18C114.996 22.18 115.482 22.0533 115.896 21.8C116.309 21.5333 116.689 21.1867 117.036 20.76L118.396 21.8C117.396 23.0933 115.996 23.74 114.196 23.74C113.449 23.74 112.769 23.6133 112.156 23.36C111.556 23.1067 111.042 22.76 110.616 22.32C110.202 21.8667 109.882 21.34 109.656 20.74C109.429 20.1267 109.316 19.4667 109.316 18.76C109.316 18.0533 109.436 17.4 109.676 16.8C109.929 16.1867 110.269 15.66 110.696 15.22C111.136 14.7667 111.656 14.4133 112.256 14.16C112.856 13.9067 113.509 13.78 114.216 13.78C115.056 13.78 115.762 13.9267 116.336 14.22C116.922 14.5133 117.402 14.9 117.776 15.38C118.149 15.8467 118.416 16.38 118.576 16.98C118.749 17.5667 118.836 18.1667 118.836 18.78V19.42H111.236ZM116.916 17.98C116.902 17.58 116.836 17.2133 116.716 16.88C116.609 16.5467 116.442 16.26 116.216 16.02C115.989 15.7667 115.702 15.5733 115.356 15.44C115.022 15.2933 114.629 15.22 114.176 15.22C113.736 15.22 113.329 15.3067 112.956 15.48C112.596 15.64 112.289 15.8533 112.036 16.12C111.782 16.3867 111.582 16.6867 111.436 17.02C111.302 17.34 111.236 17.66 111.236 17.98H116.916ZM120.989 14.02H122.789V15.48H122.829C122.949 15.2267 123.109 15 123.309 14.8C123.509 14.5867 123.729 14.4067 123.969 14.26C124.222 14.1133 124.496 14 124.789 13.92C125.082 13.8267 125.376 13.78 125.669 13.78C125.962 13.78 126.229 13.82 126.469 13.9L126.389 15.84C126.242 15.8 126.096 15.7667 125.949 15.74C125.802 15.7133 125.656 15.7 125.509 15.7C124.629 15.7 123.956 15.9467 123.489 16.44C123.022 16.9333 122.789 17.7 122.789 18.74V23.5H120.989V14.02ZM133.291 9.34H135.031L141.091 23.5H138.851L137.431 20H130.691L129.291 23.5H127.051L133.291 9.34ZM136.731 18.32L134.091 11.82H134.051L131.371 18.32H136.731ZM142.933 9.34H144.853V23.5H142.933V9.34Z"
              fill="white"
            ></path>
          </svg>
        </Link>
        {screenSize === "tablet" || screenSize === "mobile" ? (
          <DrawerButton>
            <button
              className="iconButton"
              color="inherit"
              aria-label="menu control"
              onClick={handleDrawerOpen}
            >
              {open ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_2786_9881)">
                    <path
                      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                      fill="black"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_2786_9881">
                      <rect width="24" height="24" fill="black"></rect>
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <svg
                  width="18"
                  height="12"
                  viewBox="0 0 18 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z"
                    fill="black"
                  ></path>
                </svg>
              )}
            </button>
          </DrawerButton>
        ) : (
          <>
            <Links className={scroll < 375 ? "black" : ""}>
              <li>
                <Link
                  to="/service"
                  className="headerHoverEffect"
                  onFocus={() => setDepth(false)}
                  onMouseEnter={() => setDepth(false)}
                >
                  <span>Service</span>
                </Link>
              </li>
              <li onMouseEnter={() => setDepth(true)}>
                <Link
                  to="/technology"
                  className="headerHoverEffect"
                  onFocus={() => setDepth(true)}
                >
                  <span>Technology</span>
                </Link>
                <TwoDepth
                  className={depth ? "hover" : ""}
                  onMouseEnter={() => setDepth(true)}
                >
                  <li>
                    <Link
                      to="/technology#section1"
                      className="headerHoverEffect"
                      onFocus={() => setDepth(true)}
                    >
                      <span>{t("headers.header-depth1")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/technology#section2"
                      className="headerHoverEffect"
                      onFocus={() => setDepth(true)}
                    >
                      <span>{t("headers.header-depth2")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/technology#section3"
                      className="headerHoverEffect"
                      onFocus={() => setDepth(true)}
                    >
                      <span>{t("headers.header-depth3")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/technology#section4"
                      className="headerHoverEffect"
                      onFocus={() => setDepth(true)}
                    >
                      <span>{t("headers.header-depth4")}</span>
                    </Link>
                  </li>
                </TwoDepth>
              </li>
              <li>
                <Link
                  to="/about"
                  className="headerHoverEffect"
                  onFocus={() => setDepth(false)}
                  onMouseEnter={() => setDepth(false)}
                >
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="headerHoverEffect"
                  onFocus={() => setDepth(false)}
                  onMouseEnter={() => setDepth(false)}
                >
                  <span>Contact</span>
                </Link>
              </li>
            </Links>
            <div></div>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title={
                <TooltipWrap>
                  <li>
                    <button
                      className={i18n.language === "ko" ? "active" : ""}
                      onClick={() => changeLanguageHandler("ko")}
                    >
                      KOR
                    </button>
                  </li>
                  <li>
                    <button
                      className={i18n.language === "en" ? "active" : ""}
                      onClick={() => changeLanguageHandler("en")}
                    >
                      ENG
                    </button>
                  </li>
                </TooltipWrap>
              }
            >
              <TooltipIcon className={scroll < 375 ? "black" : ""}>
                <svg
                  className="i18n"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99897 19.3038C8.69737 19.3038 7.48071 19.0605 6.34899 18.5737C5.21727 18.087 4.23252 17.4238 3.39474 16.5842C2.55695 15.7446 1.8976 14.7551 1.41668 13.6158C0.935769 12.4764 0.695312 11.2559 0.695312 9.95433C0.695312 8.65273 0.935769 7.43897 1.41668 6.31308C1.8976 5.18717 2.55695 4.20624 3.39474 3.37028C4.23252 2.53431 5.21727 1.87877 6.34899 1.40366C7.48071 0.928556 8.69737 0.691002 9.99897 0.691002C11.3006 0.691002 12.5172 0.928556 13.649 1.40366C14.7807 1.87877 15.7654 2.53431 16.6032 3.37028C17.441 4.20624 18.1013 5.18717 18.584 6.31308C19.0668 7.43897 19.3081 8.65273 19.3081 9.95433C19.3081 11.2559 19.0668 12.4764 18.584 13.6158C18.1013 14.7551 17.441 15.7446 16.6032 16.5842C15.7654 17.4238 14.7807 18.087 13.649 18.5737C12.5172 19.0605 11.3006 19.3038 9.99897 19.3038ZM9.9935 17.7938C10.5173 17.2475 10.9577 16.6209 11.3149 15.9142C11.6721 15.2074 11.9671 14.3651 12.2 13.3873H7.82091C8.03113 14.304 8.31484 15.1272 8.67205 15.8569C9.02925 16.5865 9.46973 17.2322 9.9935 17.7938ZM8.06201 17.5188C7.67642 16.9456 7.34886 16.3228 7.07935 15.6506C6.80983 14.9784 6.58341 14.224 6.40007 13.3873H2.98448C3.55773 14.4684 4.22448 15.3165 4.98472 15.9316C5.74495 16.5467 6.77072 17.0758 8.06201 17.5188ZM11.9479 17.4959C13.0406 17.1482 14.0243 16.6238 14.8992 15.9229C15.774 15.2219 16.4769 14.3767 17.008 13.3873H13.6208C13.4222 14.2087 13.1901 14.9555 12.9246 15.6277C12.6591 16.2999 12.3335 16.9227 11.9479 17.4959ZM2.53162 12.0288H6.14799C6.10216 11.6163 6.07542 11.2467 6.06778 10.9201C6.06014 10.5934 6.05632 10.2715 6.05632 9.95433C6.05632 9.57239 6.06396 9.23428 6.07924 8.94002C6.09452 8.64575 6.12507 8.31528 6.17091 7.94862H2.53162C2.42468 8.31528 2.35211 8.64193 2.31392 8.92856C2.27572 9.21519 2.25662 9.55711 2.25662 9.95433C2.25662 10.3479 2.27572 10.7004 2.31392 11.0117C2.35211 11.3231 2.42468 11.6621 2.53162 12.0288ZM7.56882 12.0288H12.452C12.5095 11.5552 12.545 11.1703 12.5584 10.8742C12.5719 10.5781 12.5786 10.2715 12.5786 9.95433C12.5786 9.64878 12.5719 9.3565 12.5584 9.07752C12.545 8.79853 12.5095 8.42223 12.452 7.94862H7.56882C7.50771 8.42223 7.46952 8.79853 7.45424 9.07752C7.43896 9.3565 7.43132 9.64878 7.43132 9.95433C7.43132 10.2715 7.43896 10.5781 7.45424 10.8742C7.46952 11.1703 7.50771 11.5552 7.56882 12.0288ZM13.827 12.0288H17.4608C17.5641 11.6621 17.6358 11.3231 17.6758 11.0117C17.7158 10.7004 17.7358 10.3479 17.7358 9.95433C17.7358 9.55711 17.7158 9.21519 17.6758 8.92856C17.6358 8.64193 17.5641 8.31528 17.4608 7.94862H13.85C13.8885 8.48699 13.9154 8.89476 13.9307 9.17193C13.9459 9.44909 13.9536 9.70989 13.9536 9.95433C13.9536 10.2868 13.9421 10.6011 13.9192 10.8971C13.8963 11.1932 13.8656 11.5705 13.827 12.0288ZM13.5979 6.5846H17.008C16.5075 5.53773 15.8198 4.66382 14.945 3.96286C14.0702 3.26192 13.0635 2.76813 11.925 2.4815C12.3106 3.04313 12.6361 3.6515 12.9017 4.30661C13.1672 4.96174 13.3993 5.72106 13.5979 6.5846ZM7.82091 6.5846H12.2229C12.0585 5.78218 11.7777 5.00284 11.3805 4.24659C10.9832 3.49034 10.5209 2.82559 9.9935 2.25234C9.51556 2.66119 9.10946 3.1999 8.77518 3.86847C8.44089 4.53704 8.12279 5.44241 7.82091 6.5846ZM2.98448 6.5846H6.42299C6.59104 5.7669 6.80219 5.03431 7.05643 4.38682C7.31067 3.73935 7.63822 3.11188 8.0391 2.50442C6.89691 2.79105 5.90079 3.27628 5.05072 3.96013C4.20065 4.64398 3.5119 5.5188 2.98448 6.5846Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </TooltipIcon>
            </Tooltip>
          </>
        )}
      </div>

      <DrawerMenu className={open ? "open" : ""}>
        <li>
          <Link to="/service">
            <span className="title">Service</span>
          </Link>
        </li>
        <li>
          <Link to="/technology">
            <span className="title">Technology</span>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <span className="title">About</span>
          </Link>
        </li>
        <li>
          <Link to="/contact">
            <span className="title">Contact</span>
          </Link>
        </li>
        <li>
          <div className="lang">
            <button
              className={i18n.language === "ko" ? "active" : ""}
              onClick={() => changeLanguageHandler("ko")}
            >
              KOR
            </button>
            <div className="langInner">
              <hr />
            </div>
            <button
              className={i18n.language === "en" ? "active" : ""}
              onClick={() => changeLanguageHandler("en")}
            >
              ENG
            </button>
          </div>
        </li>
      </DrawerMenu>
    </Wrap>
  );
}
