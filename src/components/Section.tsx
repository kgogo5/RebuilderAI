import styled from "@emotion/styled";

const Wrap = styled.section`
  margin: 300px auto 0;
  padding: 0 30px;

  @media only screen and (max-width: 1280px) {
    margin-top: 200px;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
  }

  @media only screen and (max-width: 600px) {
    margin-top: 80px;
    padding: 0;
  }
`;

export default function Section({ children }: { children: JSX.Element }) {
  return <Wrap>{children}</Wrap>;
}
