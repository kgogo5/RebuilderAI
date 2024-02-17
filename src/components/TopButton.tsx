import styled from "@emotion/styled";

const Wrap = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  display: none;
  justify-content: center;
  align-items: center;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(230, 232, 235);
  border-radius: 50%;
  cursor: pointer;
  filter: drop-shadow(rgba(0, 0, 0, 0.12) 0px 4px 12px);
  z-index: 1200;

  @media only screen and (max-width: 600px) {
    display: flex;
  }
`;

export default function TopButton() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Wrap onClick={() => scrollTop()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M7.07461 15.5249L5.84961 14.2999L11.9996 8.1499L18.1496 14.2749L16.9246 15.4999L11.9996 10.5749L7.07461 15.5249Z"
          fill="#173CFE"
        />
      </svg>
    </Wrap>
  );
}
