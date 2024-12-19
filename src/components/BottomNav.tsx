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
            <nav className="fixed w-[90%] px-[6px] translate-x-[-50%] left-[50%] transform text-primary-light bottom-2 rounded-lg bg-primary flex justify-around items-center h-[5rem] z-50 gap-4">
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
                    label="AirDrops"
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
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg ${
                currentScreen === url ? "bg-gray-medium text-yellow" : "bg-gray-dark"
            }`}
        >
            <span className="text-[1.5rem]">{children}</span>
            <span className="text-xs">{label}</span>
        </button>
    );
};

const HighlightedBtn = ({ currentScreen, label, children, url }: BtnProps) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(url)}
            className={`relative flex flex-col items-center justify-center w-16 h-16 rounded-full inset-0 ${
                currentScreen === url ? "bg-yellow" : "bg-blue-dark"
            }`}
        >
            <div className="absolute inset-0 rounded-full bg-yellow-light opacity-40"></div>
            <div className="absolute inset-0 rounded-full bg-primary flex items-center justify-center">
                <span className="text-[2rem] text-yellow">{children}</span>
            </div>
            <span className="text-xs">{label}</span>
        </button>
    );
};
