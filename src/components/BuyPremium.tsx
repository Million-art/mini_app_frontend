import { useState } from "react";
import { telegramId } from "@/libs/telegram";
import { db } from "@/firebase"; // Firebase instance
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

const BuyPremium = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const id = String(telegramId);

  const handleBuyNow = async () => {
    setLoading(true);

    try {
      // Get the user document from Firestore using doc() and getDoc()
      const userRef = doc(db, "users", id);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        setErrorMessage("User not found!");
        return;
      }

      const userData = userDoc.data();
      const balance = userData.balance || 0;

      // Check if the user has enough balance to buy the analyzer tool
      const price = 5; // $5 for the analyzer
      if (balance < price) {
        setErrorMessage("Insufficient balance. Please add funds.");
        return;
      }

      // Deduct the balance
      const newBalance = balance - price;

      // Get current timestamp
      const currentTime = serverTimestamp();

      // Update Firestore: deduct the amount, and update analyzer tool details using updateDoc()
      await updateDoc(userRef, {
        balance: newBalance, // Deduct $5
        "buy_analyzer_tool.duration": 30, // 30 days duration
        "buy_analyzer_tool.amount": price, // $5 amount
        "buy_analyzer_tool.lastPurchase": currentTime, // Timestamp of purchase
      });

      // Success message
      alert("Purchase successful!");

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
      <button
        onClick={handleBuyNow}
        className="px-3 py-1 bg-blue-600 text-white text-lg font-semibold rounded shadow hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Processing..." : "Buy Now (5$/month)"}
      </button>
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </section>
  );
};

export default BuyPremium;
