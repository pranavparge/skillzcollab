import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ChallengeListing from "./pages/ChallengeListing";
import ChallengeDetails from "./pages/ChallengeDetails";

function App() {
  return (
    <BrowserRouter>
      <h1 className="mb-6 font-extrabold text-5xl text-[#4e0f74]">
        SKILLZCOLLAB
      </h1>

      <Routes>
        <Route path="/" element={<Navigate to="/listing" replace />} />
        <Route path="/listing" element={<ChallengeListing />} />
        <Route path="/details" element={<ChallengeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
