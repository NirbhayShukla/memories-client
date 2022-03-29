import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <Container maxWidth="lg">
      {/* <Router> */}
      <Navbar />
      <Home />
      {/* <Routes> */}
      {/* <Route exact path="/" element={<Home />} /> */}
      {/* <Route exact path="/auth" element={<Auth />} /> */}
      {/* </Routes> */}
      {/* </Router> */}
    </Container>
  );
}

export default App;
