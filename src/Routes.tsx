import { Routes as Router, Route } from "react-router-dom";
import Service from "./service/Service";
import Home from "./home/Home";

export default function Routes() {
  return (
    <>
      <Router>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
      </Router>
    </>
  );
}
