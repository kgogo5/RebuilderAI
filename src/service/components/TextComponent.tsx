import styled from "@emotion/styled";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface ITextComponent {
  className?: string;
  subtitle?: string;
  title: string;
  description: string[];
}

const Wrap = styled.div`
  margin: 0 auto;
  width: 100%;
  display: block;

  @media (min-width: 1200px) {
    max-width: 1200px;
  }

  & > .inner {
    width: 100%;
    display: flex;
    flex-direction: column;
    white-space: pre-wrap;

    @media only screen and (max-width: 1280px) {
      align-items: center;
    }

    & strong {
      font-weight: 600;
      font-size: 2.4rem;
      line-height: 140%;
      color: rgb(0, 0, 0);

      @media only screen and (max-width: 1280px) {
        margin-bottom: 10px;
        max-width: unset;
        text-align: center;
      }

      @media only screen and (max-width: 768px) {
        margin-bottom: 6px;
        font-size: 1.6rem;
        color: rgb(111, 117, 123);
      }
    }

    & h1 {
      margin-bottom: 20px;
      font-weight: 600;
      font-size: 4.4rem;
      line-height: 140%;
      color: rgb(0, 0, 0);

      @media only screen and (max-width: 1280px) {
        max-width: unset;
        text-align: center;
      }

      @media only screen and (max-width: 768px) {
        margin-bottom: 16px;
        font-size: 2.2rem;
      }

      @media only screen and (max-width: 600px) {
        margin-bottom: 12px;
        font-size: 1.8rem;
      }
    }

    & p {
      font-weight: 500;
      font-size: 2.2rem;
      line-height: 140%;
      color: rgb(0, 0, 0);

      @media only screen and (max-width: 1280px) {
        max-width: unset;
        text-align: center;
      }

      @media only screen and (max-width: 768px) {
        font-size: 1.4rem;
      }

      @media only screen and (max-width: 600px) {
        font-size: 1.3rem;
        line-height: 150%;
      }
    }
  }

  &.commerce {
    padding: 9% 30px 12%;

    @media only screen and (max-width: 1280px) {
      padding: 0 120px 0;
    }

    &.en {
      padding: 4% 30px 12%;

      @media only screen and (max-width: 1280px) {
        padding: 0 120px 0;
      }

      @media only screen and (max-width: 768px) {
        padding: 0 120px 0;
      }

      @media only screen and (max-width: 600px) {
        padding: 0 20px 0;
      }
    }

    &.en strong {
      max-width: 280px;

      @media only screen and (max-width: 1280px) {
        max-width: unset;
      }

      @media only screen and (max-width: 768px) {
        max-width: unset;
      }

      @media only screen and (max-width: 600px) {
        max-width: unset;
      }
    }

    &.en h1 {
      max-width: 280px;

      @media only screen and (max-width: 1280px) {
        max-width: unset;
      }
    }
  }
`;

export default function TextComponent({
  className,
  subtitle,
  title,
  description = [],
}: ITextComponent) {
  const { i18n } = useTranslation();
  return (
    <Wrap
      className={clsx(
        "textComponent",
        className,
        i18n.language === "en" ? "en" : ""
      )}
    >
      <div className="inner">
        {subtitle && <strong>{subtitle}</strong>}
        <h1>{title}</h1>
        {description?.map((desc, index) => (
          <p key={index}>{desc}</p>
        ))}
      </div>
    </Wrap>
  );
}
