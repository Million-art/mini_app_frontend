import { useEffect, useState } from "react";
import { FaBitcoin, FaCalendarCheck, FaMoneyBillAlt, FaUsers } from "react-icons/fa";
import { MdHomeFilled } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  const [currentScreen, setCurrentScreen] = useState("/");
  useEffect(() => {
    setCurrentScreen(location.pathname);
  }, [location]);

  return (
    <footer>
      <nav className="fixed w-[90%] px-4 translate-x-[-50%] gap-3 left-[50%] bottom-4 transform text-white bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 rounded-full shadow-2xl flex justify-between items-center h-[5rem] z-50">
        <Btn
          children={<MdHomeFilled />}
          label="Home"
          currentScreen={currentScreen}
          url="/"
        />
        <Btn
          children={<FaMoneyBillAlt />}
          label="Earn"
          currentScreen={currentScreen}
          url="/earn"
        />
        <HighlightedBtn
          children={<FaBitcoin />}
          label=""
          currentScreen={currentScreen}
          url="/airdrops"
        />
        <Btn
          children={<FaCalendarCheck />}
          label="Daily"
          currentScreen={currentScreen}
          url="/daily"
        />
        <Btn
          children={<FaUsers />}
          label="Referrals"
          currentScreen={currentScreen}
          url="/referrals"
        />
      </nav>
    </footer>
  );
};

export default BottomNav;

type BtnProps = {
  currentScreen: string;
  label: string;
  url: string;
  children: React.ReactNode;
};

const Btn = ({ currentScreen, label, children, url }: BtnProps) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(url)}
      className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg transition-all duration-300 ${
        currentScreen === url
          ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue shadow-lg scale-105"
          : "bg-gray-800 text-gray-300 hover:bg-gradient-to-r hover:from-indigo-700 hover:to-blue-700 hover:text-white"
      }`}
    >
      <span
        className={`text-[1.5rem] transition-transform duration-300 ${
          currentScreen === url ? "animate-pulse" : ""
        }`}
      >
        {children}
      </span>
      <span className={`text-xs font-bold ${currentScreen === url ? "text-black" : ""}`}>
        {label}
      </span>
    </button>
  );
};

const HighlightedBtn = ({ currentScreen, label, children, url }: BtnProps) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(url)}
      className={`relative flex flex-col items-center justify-center w-16 h-16 rounded-full transition-all duration-300 ${
        currentScreen === url
          ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-xl scale-110"
          : "bg-gradient-to-r from-blue-800 to-blue-600 text-white hover:scale-105"
      }`}
    >
      <div
        className={`absolute inset-0 rounded-full ${
          currentScreen === url ? "bg-yellow-300 opacity-30 animate-pulse" : "bg-blue-300 opacity-30"
        }`}
      ></div>
      <div className="absolute inset-0 rounded-full border-4 border-transparent flex items-center justify-center transition-all duration-300 hover:border-yellow-400">
        <span className="text-[2rem]">{children}</span>
      </div>
      <span className="text-xs font-bold">{label}</span>
    </button>
  );
};
