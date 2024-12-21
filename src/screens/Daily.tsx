import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCalendarCheck } from "react-icons/fa";

import { selectUser } from "../store/slice/userSlice";
import { setShowMessage } from "../store/slice/messageSlice";
import { setCoinShow } from "../store/slice/coinShowSlice";

import { doc, getDoc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { telegramId } from "@/libs/telegram";

const Daily: React.FC  = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [claimAmount, setClaimAmount] = useState<number>(10);
  const [claimDay, setClaimDay] = useState<number>(1);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const [claimDisabled, setClaimDisabled] = useState<boolean>(false);

  const formatNumber = (num: number): string => {
    const numStr = num.toFixed(3);
    const [intPart, decPart] = numStr.split(".");
    const formattedIntPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${formattedIntPart},${num < 0.01 ? decPart : decPart.slice(0, 2)}`;
  };

  const calculateClaimAmount = useCallback(async () => {
    if (!user?.daily?.claimedTime) {
      setIsClaimed(false);
      setClaimDay(1);
      setClaimAmount(10);
      return;
    }

    const lastClaimTime =
      user.daily.claimedTime instanceof Timestamp
        ? user.daily.claimedTime.toDate()
        : new Date(user.daily.claimedTime);

    const now = Timestamp.now().toDate();
    const hoursDiff = (now.getTime() - lastClaimTime.getTime()) / (1000 * 3600);

    if (hoursDiff < 24) {
      setIsClaimed(true);
      setClaimDay(user.daily.claimedDay);
      return;
    }

    if (hoursDiff >= 48) {
      dispatch(
        setShowMessage({
          message: "You skipped a day!",
          color: "red",
        })
      );
      setIsClaimed(false);
      setClaimDay(1);
      setClaimAmount(10);
      return;
    }

    setIsClaimed(false);
    const newDay = user.daily.claimedDay + 1;
    setClaimDay(newDay);
    setClaimAmount(newDay <= 10 ? 10 * Math.pow(2, newDay - 1) : 10); // reset to day one if the strike cap is 10 day

  }, [user, dispatch]);

  const handleClaim = async () => {
    try {
      setClaimDisabled(true);
  
      dispatch(
        setShowMessage({
          message: "Claiming daily rewards...",
          color: "green",
        })
      );
  
      const id = String(telegramId);
      const userRef = doc(db, "users", id);
  
      // Fetch the current user's data to get the current balance
      const userDocSnapshot = await getDoc(userRef);
      const userData = userDocSnapshot.data();
  
      if (userData && userData.balance !== undefined) {
        const newBalance = userData.balance + claimAmount; // Add the claim amount to the current balance
  
        // Update the user document with the new balance, claimed time, and claimed day
        await updateDoc(userRef, {
          daily: {
            claimedTime: serverTimestamp(),
            claimedDay: claimDay,
          },
          balance: newBalance,  
        });
  
        dispatch(setCoinShow(true));
        setIsClaimed(true);
  
        dispatch(
          setShowMessage({
            message: `Successfully claimed $${claimAmount}!`,
            color: "green",
          })
        );
      } else {
        throw new Error("User data is invalid or balance not found.");
      }
    } catch (error) {
      console.error("Error claiming daily reward:", error);
      dispatch(
        setShowMessage({
          message: "Error. Please try again.",
          color: "red",
        })
      );
    } finally {
      setClaimDisabled(false);
    }
  };
  

  useEffect(() => {
    calculateClaimAmount();
  }, [calculateClaimAmount]);

  return (
    <div className="h-screen   bg-gradient-to-r from-gray-900 to-black  flex items-center justify-center">
      <div className="glass-card relative p-8 rounded-3xl shadow-lg max-w-md w-full text-center">
        {/* Header Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-bounce shadow-lg">
            <FaCalendarCheck className="text-6xl text-white" />
          </div>
        </div>

        {/* Title */}
        <p className="text-4xl font-bold text-white tracking-wide">
          Daily Rewards
        </p>
        <p className="text-lg text-gray-300 mt-2">Claim your reward for today!</p>
        <p className="text-2xl font-bold text-yellow-400 mt-4">Day {claimDay}</p>

        {/* Reward Button */}
        <div className="mt-8">
          {isClaimed ? (
            <button
              disabled
              className="w-full bg-gray-700 text-gray-400 font-bold py-4 rounded-lg cursor-not-allowed shadow-lg"
            >
              🎉 Claimed for today!
            </button>
          ) : (
            <button
              onClick={handleClaim}
              disabled={claimDisabled}
              className={`w-full py-4 font-bold text-white rounded-lg shadow-lg transform transition-all duration-300 ${
                claimDisabled
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-yellow-400 to-yellow-600 hover:scale-105 hover:shadow-2xl"
              }`}
            >
              Claim ${formatNumber(claimAmount)}
            </button>
          )}
        </div>

        {/* Countdown */}
        {isClaimed && (
          <p className="text-gray-400 text-sm mt-4">
            Next reward available in <span className="text-yellow-400">24h</span>
          </p>
        )}
      </div>

      {/* Footer Animation */}
      <div className="absolute bottom-10 text-center w-full">
        <span className="text-gray-400 animate-pulse">More rewards tomorrow!</span>
      </div>
    </div>
  );
};

export default Daily;
