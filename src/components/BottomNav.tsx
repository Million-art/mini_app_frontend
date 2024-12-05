import { useEffect, useState } from "react";
import { FaBitcoin, FaCalendarCheck, FaMoneyBillAlt, FaUsers } from "react-icons/fa";
import { MdHomeFilled } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom"

const BottomNav = () => {
    const location = useLocation();
    const [currentScreen, setCurrentScreen] = useState('/')
    useEffect(() => {
        setCurrentScreen(location.pathname)
    }, [location])
    return (
        <div>
            <nav className="fixed px-[6px] min-w-[90%] transform text-white bottom-2 left-4 rounded-lg bg-black flex justify-around items-center h-[4.5rem] z-50">
                <Btn children={<MdHomeFilled />} label="Home" currentScreen={currentScreen} url="/" />
                <Btn children={<FaMoneyBillAlt />} label="Earn" currentScreen={currentScreen} url="/earn" />
                <Btn children={<FaUsers />} label="Referrals" currentScreen={currentScreen} url="/referrals" />
                <Btn children={<FaCalendarCheck />} label="Daliy" currentScreen={currentScreen} url="/daliy" />
                <Btn children={<FaBitcoin />} label="AirDrops" currentScreen={currentScreen} url="/airdrops" />
            </nav>
        </div>
    )
}

export default BottomNav

type BtnProps = {
    currentScreen: string;
    label: string;
    url: string;
    children: React.ReactNode;
}
const Btn = ({ currentScreen, label, children, url }: BtnProps) => {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(url)}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg ${currentScreen === url ? 'bg-black' : 'bg-gray-900'}`}>
            <span className="text-[1.5rem]">
                {children}
            </span>
            <span className="text-xs">{label}</span>
        </button>
    )
}