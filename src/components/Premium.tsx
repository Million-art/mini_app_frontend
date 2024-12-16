import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import AddExchange from "./AddExchange";
import BuyPremium from "./BuyPremium";
import CryptoAnalyzer from "./CryptoAnalyzer";
import { telegramId } from "@/libs/telegram";
import Loading from "./Loading";
import { setLoading, setHasPurchased, setHasExchange, selectPremiumState } from "../store/slice/PremiumSlice";

const Premium = () => {
  const user_id = String(telegramId);
  const id = String(user_id);

  const dispatch = useDispatch();
  const { loading, hasPurchased, hasExchange } = useSelector(selectPremiumState);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        dispatch(setLoading(true));

        // Fetch user data from Firestore
        const userRef = doc(db, "users", id);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();

          // Check if the user has purchased the analyzer tool
          const lastPurchase = userData?.buy_analyzer_tool?.lastPurchase;
          if (lastPurchase) {
            dispatch(setHasPurchased(true));
          }

          // Check if the user has exchange credentials set
          const exchangeCredentials = userData?.exchangeCredentials;
          if (exchangeCredentials?.apiKey && exchangeCredentials?.apiSecret) {
            dispatch(setHasExchange(true));
          }
        }
      } catch (error) {
        console.error("Error checking user status: ", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkUserStatus();
  }, [id, dispatch]);

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
