import { useState } from "react";
import { telegramId } from "@/libs/telegram";
import { db } from "@/firebase";  
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import Confetti from "react-confetti";  

const BuyPremium = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);  
  const [confetti, setConfetti] = useState(false);  
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
        "buy_analyzer_tool.isActive": true,
        "buy_analyzer_tool.lastPurchase": currentTime,  
      });

      // Trigger confetti and display success message
      setConfetti(true);
      setSuccessMessage(true);

      // Hide confetti and success message after 3 seconds
      setTimeout(() => {
        setConfetti(false);
        setSuccessMessage(false);
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
      <button
        onClick={handleBuyNow}
        className="px-3 py-1 bg-blue-600 text-white text-lg font-semibold rounded shadow hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Processing..." : "Buy Now (5$/month)"}
      </button>
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      
      {/* Conditionally render confetti */}
      {confetti && <Confetti />}
      
      {/* Success message */}
      {successMessage && (
        <p className="text-green-500 mt-4 font-semibold">Successfully Purchased!</p>
      )}
    </section>
  );
};

export default BuyPremium;
