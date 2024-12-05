import BottomNav from "@/components/BottomNav";
import AirDrops from "@/screens/AirDrops";
import Daily from "@/screens/Daily";
import Earn from "@/screens/Earn";
import Home from "@/screens/Home";
import Referrals from "@/screens/Referrals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <BottomNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/aridrops" element={<AirDrops />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
