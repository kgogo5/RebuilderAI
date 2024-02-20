import styled from "@emotion/styled";

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 400px;
  background: linear-gradient(rgb(0, 0, 0) 65%, rgb(0, 0, 229) 35%);
  overflow: hidden;
`;

const Wrap = styled.div`
  margin: 0 auto;
  padding: 0 24px;
  max-width: 1200px;
`;

const Background = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url("/images/vrin_bg.png") repeat;
`;

export default function Vrin() {
  return (
    <Section>
      <Wrap></Wrap>
      <Background />
    </Section>
  );
}
