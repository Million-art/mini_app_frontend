import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";

// Firebase Firestore
import { collection, doc, getDocs, onSnapshot, query, orderBy, limit, setDoc } from "firebase/firestore";
import { db } from "./firebase";  

// Components
import BottomNav from "@/components/BottomNav";
import Loading from "@/components/Loading";

// Screens
import Home from "@/screens/Home";
import Referrals from "@/screens/Referrals";
import Earn from "@/screens/Earn";
import Daily from "@/screens/Daily";
import AirDrops from "@/screens/AirDrops";

// Redux Actions and Selectors
import { setTopUsers } from "./store/slice/topUsersSlice";
import { setUser } from "./store/slice/userSlice";
import { setShowMessage, selectShowMessage } from "./store/slice/messageSlice";
import { selectUser } from "./store/slice/userSlice";
import { selectCalculate } from "./store/slice/calculateSlice";
import { AppDispatch, RootState } from "./store/store";  

//telegram user import
import { telegramId } from "./libs/telegram";
import { userName } from "./libs/telegram";
import { firstName } from "./libs/telegram";
import { lastName } from "./libs/telegram";
import { languageCode } from "./libs/telegram";
 
function App() {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const user = useSelector((state: RootState) => selectUser(state));
  const calculate = useSelector((state: RootState) => selectCalculate(state));
  const message = useSelector((state: RootState) => selectShowMessage(state));
 
  // Fetch user data from Firestore
  useEffect(() => {
    const getUser = () => {
       
      const unSub = onSnapshot(doc(db, "users", String(telegramId)), async (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          dispatch(
            setUser({
              uid: data.id,
              userImage: data.userImage,
              firstName: data.firstName,
              lastName: data.lastName,
              username: data.username,
              languageCode: data.languageCode,
              referrals: data.referrals || {},
              referredBy: data.referredBy || null,
              isPremium: data.isPremium || false,
              balance: data.balance || 0,
              
              daily: {
                claimedTime: data.daily?.claimedTime
                  ? data.daily.claimedTime.toMillis()
                  : null,
                claimedDay: data.daily?.claimedDay || 0,
              },
              walletAddress:data.walletAddress,
            })
          );
        } else {
          await setDoc(doc(db, "users", String(telegramId)), {
            firstName: firstName,
            lastName: lastName || null,
            username: userName || null,
            languageCode: languageCode,
            referrals: {},
            referredBy: null,
            balance: 0,
            mineRate: 0.001,
            isMining: false,
            miningStartedTime: null,
            daily: {
              claimedTime: null,
              claimedDay: 0,
            },
            walletAddress: null,
          });
        }
      });
      return unSub;
    };

    return getUser();
  }, [dispatch]);

  // Fetch top users
  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy("balance", "desc"), limit(50));
        const querySnapshot = await getDocs(q);
        const topUsers = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          balance: docSnap.data().balance,
          userImage: docSnap.data().userImage,
          firstName: docSnap.data().firstName,
          lastName: docSnap.data().lastName,
        }));
        dispatch(setTopUsers(topUsers));
      } catch (error) {
        console.error("Error fetching top users:", error);
      }
    };

    fetchTopUsers();
  }, [dispatch]);

  // Show message as toast
  useEffect(() => {
    if (message) {
      toast(message.message, {
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: false,
      });
      dispatch(setShowMessage(null));
    }
  }, [message, dispatch]);

  return (
    <BrowserRouter>
      {user && calculate && <BottomNav />}
      <ToastContainer
        style={{
          width: "calc(100% - 40px)",
          maxWidth: "none",
          left: "20px",
          right: "20px",
          top: "20px",
          height: "20px",
        }}
        toastStyle={{
          minHeight: "20px",
          padding: "0px 10px",
          paddingBottom: "4px",
          backgroundColor: message?.color || "#00c000",
          color: "white",
          borderRadius: "6px",
          marginBottom: "4px",
        }}
      />
      <Routes>
        <Route path="*" element={<Loading />} />
        <Route path="/" element={<Home />} />
        <Route path="/referrals" element={<Referrals />} />
         <Route path="/earn" element={<Earn />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/airdrops" element={<AirDrops />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
