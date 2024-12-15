import { useState, useEffect } from "react";
import { db } from "@/firebase"; // Firebase instance
import { doc, getDoc } from "firebase/firestore"; // Import necessary Firestore functions
import AddExchange from "./AddExchange";
import BuyPremium from "./BuyPremium";
import CryptoAnalyzer from "./CryptoAnalyzer";
import { telegramId } from "@/libs/telegram";

const Premium = () => {
  const [hasPurchased, setHasPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const user_id = String(telegramId)
  const id = String(user_id); 
  useEffect(() => {
    const checkPurchaseStatus = async () => {
      try {
        // Fetch user data from Firestore
        const userRef = doc(db, "users", id);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const lastPurchase = userData?.buy_analyzer_tool?.lastPurchase;

          // Check if the user has purchased the analyzer tool (i.e., has a valid last purchase)
          if (lastPurchase) {
            setHasPurchased(true);
          }
        }
      } catch (error) {
        console.error("Error checking purchase status: ", error);
      } finally {
        setLoading(false);
      }
    };

    checkPurchaseStatus();
  }, [id]);

  // Show loading message while checking purchase status
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      {!hasPurchased ? (
        <BuyPremium /> // Show BuyPremium if not purchased
      ) : (
        <>
          <AddExchange />
          <CryptoAnalyzer />
        </>
      )}
    </section>
  );
};

export default Premium;
