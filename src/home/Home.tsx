import { useEffect } from "react";
import Camera from "./Camera";
import Careers from "./Careers";
import Scanning from "./Scanning";
import Vision from "./Vision";
import Visual from "./Visual";

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <>
      <main>
        <Visual />

        <Vision />

        <Scanning />

        <Camera />

        <Careers />
      </main>
    </>
  );
}
