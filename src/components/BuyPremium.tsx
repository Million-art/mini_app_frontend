import { useState } from "react";
import { telegramId } from "@/libs/telegram";
const BuyPremium = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const id = String(telegramId)
  const handleBuyNow = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://mini-app-backend-two.vercel.app/api/buy_crypto_analyzer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: id }),  
      });

      const data = await response.json();

      if (response.ok) {
        alert("Purchase successful!");  
      } else {
        setErrorMessage(data.error || "An error occurred");
      }
    } catch (error) {
      setErrorMessage("An error occurred while processing the request.");
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
