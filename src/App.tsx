import Layout from "./layout/Layout";
import Visual from "./home/Visual";
import Vision from "./home/Vision";
import Scanning from "./home/Scanning";
import Camera from "./home/Camera";
import Careers from "./home/Careers";

function App() {
  return (
    <Layout>
      <>
        <Visual />

        <Vision />

        <Scanning />

        <Camera />

        <Careers />
      </>
    </Layout>
  );
}

export default App;
