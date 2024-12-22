import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CryptoAnalyzer from "./CryptoAnalyzer";
import { telegramId } from "@/libs/telegram";
import Loading from "./Loading";
import { FaLock } from "react-icons/fa";  
import { setLoading, selectPremiumState, sethasMRBToken } from "../store/slice/PremiumSlice";

const Premium = () => {
  const user_id = String(telegramId);
  const id = String(user_id);

  const dispatch = useDispatch();
  const { loading, hasMRBToken } = useSelector(selectPremiumState);

  useEffect(() => {
    const checkUserHoldToken = async () => {
      try {
        dispatch(setLoading(true));

        // Retrieve jettons from localStorage
        const jettons = localStorage.getItem("jettons");

        if (jettons) {
          // Parse the JSON string back to an array
          const parsedJettons = JSON.parse(jettons);
          // MRB contract address in RAW (HEX) format
          const MRB_CONTRACT_ADDRESS_RAW = "0:b5f322c4e4077bd559ed708c1a32afcfc005b5a36fb4082a07fec4df71d45cee"; // RAW HEX format
          console.log('JSON parsed', parsedJettons);

          // Check if MRB_CONTRACT_ADDRESS_RAW exists in the list of jetton addresses (assuming the jettons addresses are in RAW HEX format)
          const hasMRBToken = parsedJettons.some(
            (jetton: any) => jetton.address === MRB_CONTRACT_ADDRESS_RAW
          );

          // Update state based on the presence of the token
          dispatch(sethasMRBToken(hasMRBToken));
        } else {
          // If no jettons data is available
          dispatch(sethasMRBToken(false));
        }
      } catch (error) {
        console.error("Error checking user status: ", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkUserHoldToken();
  }, [id, dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="mt-6 w-screen flex items-center justify-center">
      {!hasMRBToken ? (
        <div className="flex flex-col items-center text-center bg-gray-deep  rounded-lg shadow-lg space-y-4">
          <div className="text-6xl text-yellow">
            <FaLock className="animate-bounce" />  
          </div>
          <h2 className="text-3xl font-bold text-white">Access Locked!</h2>
          <p className="text-gray-100">
            You need  <span className="text-yellow font-semibold">OUR Token</span> in your
            wallet to access the premium analyzer. 
          </p>
          <p className="text-gray-100">connect your wallet</p>
          <button
            className="px-6 py-3 bg-yellow text-black rounded-lg hover:bg-yellow-light transition-all"
            onClick={() => window.open("https://t.me/blum/app?startapp=memepadjetton_MRB_3UKTM-ref_jM0CnzEvER", "_blank")}
          >
            Get Token Now
          </button>
        </div>
      ) : (
        <CryptoAnalyzer />
      )}
    </section>
  );
};

export default Premium;
