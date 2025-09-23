import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ChallengeListing from "./pages/ChallengeListing";
import ChallengeDetails from "./pages/ChallengeDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/listing" replace />} />
        <Route path="/listing" element={<ChallengeListing />} />
        <Route path="/details" element={<ChallengeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
