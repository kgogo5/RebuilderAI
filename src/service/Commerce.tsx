import Slider from "react-slick";
import styled from "@emotion/styled";
import TextComponent from "./components/TextComponent";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { screenSizeAtom } from "../lib/atom";
import { useAtom } from "jotai";

const images = [
  "/images/commerce_slide01.png",
  "/images/commerce_slide02.png",
  "/images/commerce_slide03.png",
  "/images/commerce_slide04.png",
];

const Section = styled.section`
  position: relative;
  padding: 200px 0px 200px 12px;
  width: 100%;
  height: 100%;
  display: block;

  @media only screen and (max-width: 1280px) {
    padding: 180px 0;

    & .textComponent {
      padding: 0 120px 0;
    }
  }

  @media only screen and (max-width: 768px) {
    padding: 100px 0;

    & .textComponent {
      padding: 0 120px 0;
    }
  }

  @media only screen and (max-width: 600px) {
    padding: 80px 0;

    & .textComponent {
      padding: 0 20px 0;
    }
  }
`;

const SliderWrap = styled.div`
  position: absolute;
  top: 200px;
  right: 0px;
  width: 54.7%;

  @media only screen and (max-width: 1280px) {
    position: unset;
    top: unset;
    right: unset;
    width: 100%;
    margin-top: 60px;
  }

  & .slick-slider {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
    touch-action: pan-y;
    user-select: none;

    & img {
      width: 100%;
      min-height: 446.22px;
      height: auto;
      object-fit: cover;
    }

    & .slick-track div {
      padding: 0 4px;

      @media only screen and (max-width: 1280px) {
        padding: 0 3px;
      }
    }
  }
`;

const ImageArea = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;

  @media only screen and (max-width: 768px) {
    padding: 0 120px;
  }

  @media only screen and (max-width: 600px) {
    padding: 0 20px;
  }

  & img {
    width: 100%;
    height: auto;
  }
`;

export default function Commerce() {
  const { t, i18n } = useTranslation();
  const [screenSize] = useAtom(screenSizeAtom);

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: screenSize === "bigDesctop" ? 2.5 : 3,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    autoplay: true,
    touchMove: false,
    swipeToSlide: false,
    draggable: false,
    adaptiveHeight: true,
  };

  return (
    <Section>
      <TextComponent
        className="commerce"
        subtitle={t("service.commerce.text1")}
        title={t("service.commerce.text2")}
        description={
          i18n.language === "en"
            ? [
                t("service.commerce.text3"),
                t("service.commerce.text4"),
                t("service.commerce.text5"),
              ]
            : [t("service.commerce.text3"), t("service.commerce.text4")]
        }
      />

      {screenSize === "bigDesctop" ||
      screenSize === "desctop" ||
      screenSize === "notebook" ? (
        <SliderWrap>
          <Slider {...settings}>
            {images.map((image) => (
              <div key={image}>
                <img src={image} alt="slide image" />
              </div>
            ))}
          </Slider>
        </SliderWrap>
      ) : (
        <ImageArea>
          {images.map((item, index) => (
            <img key={index} src={item} alt="slide image" />
          ))}
        </ImageArea>
      )}
    </Section>
  );
}
