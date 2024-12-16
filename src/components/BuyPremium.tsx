import { useState } from "react";
import { useDispatch } from "react-redux";
import { telegramId } from "@/libs/telegram";
import { db } from "@/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { setHasPurchased } from "../store/slice/PremiumSlice";
import Confetti from "react-confetti";
import { updateUserBalance } from "../store/slice/userSlice";

const BuyPremium = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false); // For hiding the button
  const [showConfetti, setShowConfetti] = useState(false); // For confetti effect
  const dispatch = useDispatch();
  const id = String(telegramId);

  const handleBuyNow = async () => {
    setLoading(true);

    try {
      const userRef = doc(db, "users", id);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        setErrorMessage("User not found!");
        return;
      }

      const userData = userDoc.data();
      const balance = userData.balance || 0;
      const price = 5; // $5 for the analyzer tool

      if (balance < price) {
        setErrorMessage("Insufficient balance. Please add funds.");
        return;
      }
      const newBalance = balance - price;
      // Deduct balance and update Firestore
      await updateDoc(userRef, {
        balance: balance - price,
        "buy_analyzer_tool.duration": 30, // 30 days duration
        "buy_analyzer_tool.amount": price,
        "buy_analyzer_tool.isActive": true,
        "buy_analyzer_tool.lastPurchase": serverTimestamp(),
      });

        dispatch(updateUserBalance(newBalance));

        // Show confetti and hide "Buy Now" button
        setShowConfetti(true);
        setSuccess(true);

        // Hide confetti after 3 seconds
        setTimeout(() => {
          setShowConfetti(false);
          // Dispatch action to update premium state in Redux
          dispatch(setHasPurchased(true));
        }, 3000);
    } catch (error) {
      setErrorMessage("An error occurred while processing the request.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center bg-gray-900 p-4">
      <h2 className="text-2xl text-gray-200 mb-6">Advanced Crypto Analysis</h2>

      {/* Conditionally render the button */}
      {!success && (
        <button
          onClick={handleBuyNow}
          className="px-3 py-1 bg-blue-600 text-white text-lg font-semibold rounded shadow hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Processing..." : "Buy Now (5$/month)"}
        </button>
      )}

      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

      {/* Confetti effect */}
      {showConfetti && <Confetti />}

      {/* Success message */}
      {success && (
        <p className="text-green-500 mt-4 font-semibold">
          Thank you for purchasing Premium!
        </p>
      )}
    </section>
  );
};

export default BuyPremium;
