import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Signup from "./Signup";
import LandingPage from "./LandingPage";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
