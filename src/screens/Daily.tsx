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

    <div className="text-white bg-gray-deep h-screen">
      <div className="flex items-center justify-center py-10">
        <div className="rounded-full p-4">
          <FaCalendarCheck className="w-28 h-28 object-contain text-yellow" />
        </div>
      </div>
      <p className="text-center font-bold text-3xl">Daily Rewards</p>
      <p className="text-center text-lg mt-2">
        Here you can claim your daily rewards
      </p>
      <p className="text-center text-xl font-bold mt-4 ">(Day {claimDay})</p>
      <div className="mx-10 mt-20">
        {isClaimed ? (
          <button
            disabled

            className="w-full bg-gray-medium text-white font-bold py-2 rounded cursor-not-allowed"
          >
            Claimed for today
          </button>
        ) : (
          <button
            onClick={handleClaim}
            disabled={claimDisabled}
            className={`w-full ${

              claimDisabled ? "bg-gray-dark" : "bg-yellow hover:bg-yellow-light"
            } text-white font-bold py-2 rounded`}
          >
            Claim ${formatNumber(claimAmount)}
          </button>
        )}
      </div>
    </div>
  );
};

export default Daily;
