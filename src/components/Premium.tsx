import { useState, useEffect } from "react";
import { db } from "@/firebase";  
import { doc, getDoc } from "firebase/firestore";  
import AddExchange from "./AddExchange";
import BuyPremium from "./BuyPremium";
import CryptoAnalyzer from "./CryptoAnalyzer";
import { telegramId } from "@/libs/telegram";
import Loading from "./Loading";

const Premium = () => {
  const [hasPurchased, setHasPurchased] = useState(false);
  const [hasExchange, setHasExchange] = useState(false);
  const [loading, setLoading] = useState(true);
  const user_id = String(telegramId);
  const id = String(user_id);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // Fetch user data from Firestore
        const userRef = doc(db, "users", id);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          
          // Check if the user has purchased the analyzer tool
          const lastPurchase = userData?.buy_analyzer_tool?.lastPurchase;
          if (lastPurchase) {
            setHasPurchased(true);
          }

          // Check if the user has exchange credentials set
          const exchangeCredentials = userData?.exchangeCredentials;
          if (exchangeCredentials?.apiKey && exchangeCredentials?.apiSecret) {
            setHasExchange(true);
          }
        }
      } catch (error) {
        console.error("Error checking user status: ", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, [id]);

  // Show loading message while checking status
  if (loading) {
    return <Loading />;
  }

  return (
    <section>
      {!hasPurchased ? (
        <BuyPremium /> // Show BuyPremium if not purchased
      ) : (
        <>
          {!hasExchange ? (
            <AddExchange /> // Show AddExchange if no exchange credentials are present
          ) : (
            <CryptoAnalyzer /> // Show CryptoAnalyzer if exchange credentials exist
          )}
        </>
      )}
    </section>
  );
};

export default Premium;
