// import BottomNav from "@/components/BottomNav";
// import AirDrops from "@/screens/AirDrops";
// import Daily from "@/screens/Daily";
// import Earn from "@/screens/Earn";
// import Home from "@/screens/Home";
// import Referrals from "@/screens/Referrals";
// import { useEffect, useState } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import 'react-toastify/dist/ReactToastify.css';

// import { selectCalculate } from "@/store/slice/calculateSlice";
// import { selectCoinShow } from "@/store/slice/coinShowSlice";
// import { selectShowMessage, setShowMessage } from "@/store/slice/messageSlice";
// import { selectUser, setUser } from "@/store/slice/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { toast, ToastContainer } from 'react-toastify';
// import { setTopUsers } from "@/store/slice/topUsersSlice";
// import CalculateNums from "@/components/CalculateNums";
// import CoinAnimation from "@/components/CoinAnimation";
// import Loading from "@/components/Loading";




// declare global {
//   interface Window {
//     Telegram: {
//       WebApp: {
//         ready: () => void;
//         expand: () => void;
//         setBackgroundColor: (color: string) => void;
//         setHeaderColor: (color: string) => void;
//         initDataUnsafe: {
//           user: {
//             id: number;
//             first_name: string;
//             last_name: string | null;
//             username: string | null;
//             language_code: string;
//           };
//         };
//       };
//     };
//   }
// }

// // Define type for WebApp state
// interface WebAppState {
//   id: string;
//   firstName: string;
//   lastName: string | null;
//   userName: string | null;
//   languageCode: string;
// }

// function App() {

//   const dispatch = useDispatch();
//   const user = useSelector(selectUser);
//   const calculate = useSelector(selectCalculate);
//   const message = useSelector(selectShowMessage);
//   const coinShow = useSelector(selectCoinShow);
//   // Set the WebApp state with a default value that matches WebAppState type
//   const [webApp, setWebApp] = useState<WebAppState | null>(null);
//   const processLinks = (links) => {
//     if (!links) return {};
//     return Object.entries(links).reduce((acc, [key, value]) => {
//       acc[key] = {
//         ...value,
//         time: value.time ? value.time.toMillis() : null,
//       };
//       return acc;
//     }, {})
//   };

//   useEffect(() => {

//     const getUser = () => {
//       const unSub = onSnapshot(doc(db, 'users', webApp.id), async (docSnap) => {
//         if (docSnap.exists()) {
//           dispatch(setUser({
//             uid: webApp?.id,
//             userImage: docSnap.data().userImage,
//             firstName: docSnap.data().firstName,
//             lastName: docSnap.data().lastName,
//             username: docSnap.data().username,
//             languageCode: docSnap.data().languageCode,
//             referrals: docSnap.data().referrals,
//             referredBy: docSnap.data().referredBy,
//             isPremium: docSnap.data().isPremium,
//             balance: docSnap.data().balance,
//             mineRate: docSnap.data().mineRate,
//             isMining: docSnap.data().isMining,
//             miningStartedTime: docSnap.data().miningStartedTime ? docSnap.data().miningStartedTime.toMillis() : null,
//             daily: {
//               claimedTime: docSnap.data().daily.claimedTime
//                 ? docSnap.data().daily.claimedTime.toMillis()
//                 : null,
//               claimedDay: docSnap.data().daily.claimedDay,
//             },
//             links: processLinks(docSnap.data().links),
//           })
//           )
//           console.log(docSnap.data());
//         }
//         else {
//           await setDoc(doc(db, 'users', webApp?.id), {
//             firstName: webApp.firstName,
//             lastName: webApp.lastName || null,
//             username: webApp.username || null,
//             langageCode: webApp.langageCode,
//             referrals: {},
//             referredBy: null,
//             balance: 0,
//             mineRate: 0.001,
//             isMining: false,
//             miningStartedTime: null,
//             daily: {
//               claimedTime: null,
//               claimedDay: 0,
//             },
//             links: null,
//           });
//         }
//       })
//       return () => {
//         unSub();
//       };
//     };
//     if (webApp) {
//       getUser();
//     }

//   }, [dispatch, webApp]);

//   useEffect(() => {
//     const fetchTopUsers = async () => {
//       try {
//         const usersRef = collection(db, "users");
//         const q = query(usersRef, orderBy("balance", "desc"), limit(50));
//         const querySnapshot = await getDocs(q);
//         const topUsers = querySnapshot.docs.map((docSnap) => ({
//           id: docSnap.id,
//           balance: docSnap.data().balance,
//           userImage: docSnap.data().userImage,
//           firstName: docSnap.data().firstName,
//           lastName: docSnap.data().lastName,
//         }));
//         dispatch(setTopUsers(topUsers));
//       } catch (error) {
//         console.error("Error fetching top users:", error);
//       }
//     };

//     fetchTopUsers();
//   }, [dispatch]);

//   useEffect(() => {
//     if (message) {
//       toast(message.message, {
//         autoClose: 2500,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         closeButton: false,
//       });
//       dispatch(setShowMessage(null));
//     }
//   }, [message, dispatch]);



//   useEffect(() => {
//     const tg = window.Telegram.WebApp;
//     tg.ready();

//     if (tg?.initDataUnsafe.user?.id) {
//       const userId = tg.initDataUnsafe.user.id;
//       const userIdString = userId.toString();

//       setWebApp({
//         id: userIdString,
//         firstName: tg?.initDataUnsafe?.user?.first_name || "",
//         lastName: tg?.initDataUnsafe?.user?.last_name || null,
//         userName: tg?.initDataUnsafe?.user?.username || null,
//         languageCode: tg?.initDataUnsafe?.user?.language_code || "",
//       });

//       tg.expand();
//       tg.setBackgroundColor("#0b0b0b");
//       tg.setHeaderColor("#0b0b0b");
//     } else {
//       // Fallback if user data is unavailable
//       setWebApp({
//         id: "82424881123",
//         firstName: "FirstName",
//         lastName: null,
//         userName: "@username",
//         languageCode: "en",
//       });
//     }
//   }, []); // Empty dependency array ensures this effect runs only once

//   return (
//     <BrowserRouter>
//       {user && calculate && <BottomNav />}
//       {user && (
//         <>
//           <CalculateNums />
//           <ToastContainer
//             style={{
//               width: "calc(100% - 40px)", // 40px is the total of left and right margins
//               maxWidth: "none",
//               left: "20px",
//               right: "20px",
//               top: "20px",
//               height: "20px",
//             }}
//             toastStyle={{
//               minHeight: "20px", // Adjust this value to change the height of the toast
//               padding: "0px 10px", // Adjust padding to further control spacing
//               paddingBottom: "4px",
//               backgroundColor:
//                 message?.color === "green"
//                   ? "#00c000"
//                   : message?.color === "blue"
//                     ? "#1d4ed8"
//                     : "red",
//               color: "white",
//               borderRadius: "6px",
//               marginBottom: "4px",
//             }}
//           />
//           <CoinAnimation />
//         </>
//       )}

//       <BottomNav />
//       <Routes>
//         <Route path="*" element={<Loading />} />
//         <Route path="/" element={<Home />} />
//         {user && calculate && <Route path="/referrals" element={<Referrals />} />}
//         {user && calculate && <Route path="/earn" element={<Earn />} />}
//         {user && calculate && <Route path="/daily" element={<Daily />} />}
//         {user && calculate && <Route path="/aridrops" element={<AirDrops />} />}
//       </Routes>

//     </BrowserRouter>
//   );
// }

// export default App;




// import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import { useSelector, useDispatch } from "react-redux";
// import { onSnapshot, doc, collection, query, orderBy, limit, getDocs, setDoc } from "firebase/firestore";

// Components
import BottomNav from "@/components/BottomNav";
// import CalculateNums from "@/components/CalculateNums";
// import CoinAnimation from "@/components/CoinAnimation";

// Screens
import AirDrops from "@/screens/AirDrops";
import Daily from "@/screens/Daily";
import Earn from "@/screens/Earn";
import Home from "@/screens/Home";
import Referrals from "@/screens/Referrals";
import Loading from "@/components/Loading";

// Redux Slices
// import { AppDispatch, RootState } from "@/store/store"; // Add RootState and AppDispatch types
// import { selectCalculate } from "@/store/slice/calculateSlice";
// import { selectCoinShow } from "@/store/slice/coinShowSlice";
// import { selectShowMessage, setShowMessage } from "@/store/slice/messageSlice";
// import { selectUser, setUser } from "@/store/slice/userSlice";
// import { setTopUsers } from "@/store/slice/topUsersSlice";

// // Firebase
// import { db } from "@/libs/firebase"; // Make sure to import the correct Firebase config

// Type Definitions
// declare global {
//   interface Window {
//     Telegram: {
//       WebApp: {
//         ready: () => void;
//         expand: () => void;
//         setBackgroundColor: (color: string) => void;
//         setHeaderColor: (color: string) => void;
//         initDataUnsafe: {
//           user: {
//             id: number;
//             first_name: string;
//             last_name: string | null;
//             username: string | null;
//             language_code: string;
//           };
//         };
//       };
//     };
//   }
// }

// interface WebAppState {
//   id: string;
//   firstName: string;
//   lastName: string | null;
//   userName: string | null;
//   languageCode: string;
// }

// Utility Function Typing
// const processLinks = (links: Record<string, any> | null): Record<string, any> => {
//   if (!links) return {};
//   return Object.entries(links).reduce((acc, [key, value]) => {
//     acc[key] = {
//       ...value,
//       time: value.time ? value.time.toMillis() : null,
//     };
//     return acc;
//   }, {} as Record<string, any>);
// };

// App Component
function App() {

  // const dispatch = useDispatch<AppDispatch>();
  // const user = useSelector((state: RootState) => selectUser(state));
  // const calculate = useSelector((state: RootState) => selectCalculate(state));
  // const message = useSelector((state: RootState) => selectShowMessage(state));
  // const coinShow = useSelector((state: RootState) => selectCoinShow(state));

  // const [webApp, setWebApp] = useState<WebAppState | null>(null);

  // // Fetch user data from Firestore
  // useEffect(() => {
  //   const getUser = () => {
  //     const unSub = onSnapshot(doc(db, 'users', webApp?.id || ""), async (docSnap) => {
  //       if (docSnap.exists()) {
  //         dispatch(
  //           setUser({
  //             uid: webApp?.id,
  //             userImage: docSnap.data().userImage,
  //             firstName: docSnap.data().firstName,
  //             lastName: docSnap.data().lastName,
  //             username: docSnap.data().username,
  //             languageCode: docSnap.data().languageCode,
  //             referrals: docSnap.data().referrals,
  //             referredBy: docSnap.data().referredBy,
  //             isPremium: docSnap.data().isPremium,
  //             balance: docSnap.data().balance,
  //             mineRate: docSnap.data().mineRate,
  //             isMining: docSnap.data().isMining,
  //             miningStartedTime: docSnap.data().miningStartedTime
  //               ? docSnap.data().miningStartedTime.toMillis()
  //               : null,
  //             daily: {
  //               claimedTime: docSnap.data().daily.claimedTime
  //                 ? docSnap.data().daily.claimedTime.toMillis()
  //                 : null,
  //               claimedDay: docSnap.data().daily.claimedDay,
  //             },
  //             links: processLinks(docSnap.data().links),
  //           })
  //         );
  //       } else {
  //         await setDoc(doc(db, 'users', webApp?.id || ""), {
  //           firstName: webApp?.firstName,
  //           lastName: webApp?.lastName || null,
  //           username: webApp?.userName || null,
  //           languageCode: webApp?.languageCode,
  //           referrals: {},
  //           referredBy: null,
  //           balance: 0,
  //           mineRate: 0.001,
  //           isMining: false,
  //           miningStartedTime: null,
  //           daily: {
  //             claimedTime: null,
  //             claimedDay: 0,
  //           },
  //           links: null,
  //         });
  //       }
  //     });
  //     return unSub;
  //   };
  //   if (webApp) getUser();
  // }, [dispatch, webApp]);

  // // Fetch top users from Firestore
  // useEffect(() => {
  //   const fetchTopUsers = async () => {
  //     try {
  //       const usersRef = collection(db, "users");
  //       const q = query(usersRef, orderBy("balance", "desc"), limit(50));
  //       const querySnapshot = await getDocs(q);
  //       const topUsers = querySnapshot.docs.map((docSnap) => ({
  //         id: docSnap.id,
  //         balance: docSnap.data().balance,
  //         userImage: docSnap.data().userImage,
  //         firstName: docSnap.data().firstName,
  //         lastName: docSnap.data().lastName,
  //       }));
  //       dispatch(setTopUsers(topUsers));
  //     } catch (error) {
  //       console.error("Error fetching top users:", error);
  //     }
  //   };

  //   fetchTopUsers();
  // }, [dispatch]);

  // // Show message as toast
  // useEffect(() => {
  //   if (message) {
  //     toast(message.message, {
  //       autoClose: 2500,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       closeButton: false,
  //     });
  //     dispatch(setShowMessage(null));
  //   }
  // }, [message, dispatch]);

  // // Initialize Telegram WebApp
  // useEffect(() => {
  //   const tg = window.Telegram.WebApp;
  //   tg.ready();

  //   if (tg?.initDataUnsafe?.user?.id) {
  //     const userId = tg.initDataUnsafe.user.id.toString();
  //     setWebApp({
  //       id: userId,
  //       firstName: tg.initDataUnsafe.user.first_name || "",
  //       lastName: tg.initDataUnsafe.user.last_name || null,
  //       userName: tg.initDataUnsafe.user.username || null,
  //       languageCode: tg.initDataUnsafe.user.language_code || "",
  //     });
  //     tg.expand();
  //     tg.setBackgroundColor("#0b0b0b");
  //     tg.setHeaderColor("#0b0b0b");
  //   } else {
  //     setWebApp({
  //       id: "82424881123",
  //       firstName: "FirstName",
  //       lastName: null,
  //       userName: "@username",
  //       languageCode: "en",
  //     });
  //   }
  // }, []);

  return (
    <BrowserRouter>
      {/* {user && calculate && <BottomNav />} */}
      {/* {user && (
        <>
          <CalculateNums />
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
              backgroundColor:
                message?.color === "green"
                  ? "#00c000"
                  : message?.color === "blue"
                  ? "#1d4ed8"
                  : "red",
              color: "white",
              borderRadius: "6px",
              marginBottom: "4px",
            }}
          />
          <CoinAnimation />
        </>
      )} */}
      <BottomNav />
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
          backgroundColor: "#00c000",
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
        {/* {user && calculate && <Route path="/referrals" element={<Referrals />} />}
        {user && calculate && <Route path="/earn" element={<Earn />} />}
        {user && calculate && <Route path="/daily" element={<Daily />} />}
        {user && calculate && <Route path="/aridrops" element={<AirDrops />} />} */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
