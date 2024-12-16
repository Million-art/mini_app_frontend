import { useState } from "react";
import { useDispatch } from "react-redux";
import { telegramId } from "@/libs/telegram";
import { db } from "@/firebase";
import { doc, serverTimestamp, runTransaction } from "firebase/firestore";
import { setHasPurchased } from "../store/slice/PremiumSlice";
import Confetti from "react-confetti";
import { updateUserBalance } from "../store/slice/userSlice";

const BuyPremium = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const dispatch = useDispatch();
  const id = String(telegramId);

  const handleBuyNow = async () => {
    setLoading(true);
    const price = 5; // $5 for the analyzer tool

    try {
      await runTransaction(db, async (transaction) => {
        const userRef = doc(db, "users", id);
        const userDoc = await transaction.get(userRef);

        if (!userDoc.exists()) {
          throw new Error("User not found!");
        }

        const userData = userDoc.data();
        const balance = userData.balance || 0;

        if (balance < price) {
          throw new Error("Insufficient balance. Please add funds.");
        }

        const newBalance = balance - price;

        // Set both timestamps using Firestore's serverTimestamp()
        const timestamp = serverTimestamp();

        // Update user data within the transaction
        transaction.update(userRef, {
          balance: newBalance,
          "buy_analyzer_tool.duration": 30, // 30 days
          "buy_analyzer_tool.amount": price,
          "buy_analyzer_tool.isActive": true,
          "buy_analyzer_tool.lastPurchase": timestamp, // Use single timestamp variable
          "buy_analyzer_tool.expirationDate": timestamp, // Use same timestamp
        });

        // Update Redux state
        dispatch(updateUserBalance(newBalance));
      });

      // Show confetti and set success state
      setShowConfetti(true);
      setSuccess(true);

      // Dispatch premium purchase state
      setTimeout(() => {
        setShowConfetti(false);
        dispatch(setHasPurchased(true));
      }, 3000);
    } catch (error:any) {
      console.error("Error during transaction:", error);
      setErrorMessage(error.message || "An unexpected error occurred.");
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
