import { useState } from "react";
import { db } from "@/firebase";  
import { doc, getDoc, setDoc } from "firebase/firestore";  
import { telegramId } from "@/libs/telegram"; 
import CryptoJS from "crypto-js"; 
import CryptoAnalyzer from "./CryptoAnalyzer";

const AddExchange = () => {
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [exchangePlatform, setExchangePlatform] = useState("binance");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);  
  const [exchangeAdded, setExchangeAdded] = useState(false);
  const id = String(telegramId);
  
  // Encryption function
  const encryptCredentials = (apiKey: string, apiSecret: string) => {
    const secretKey = "fdhdaj14=-+#Q@-secret-key";  
    const encryptedApiKey = CryptoJS.AES.encrypt(apiKey, secretKey).toString();
    const encryptedApiSecret = CryptoJS.AES.encrypt(apiSecret, secretKey).toString();
    return { encryptedApiKey, encryptedApiSecret };
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!apiKey || !apiSecret) {
      setErrorMessage("Both API Key and Secret are required.");
      return;
    }

    try {
      setLoading(true);
      const { encryptedApiKey, encryptedApiSecret } = encryptCredentials(apiKey, apiSecret);

      const userDocRef = doc(db, "users", id);  
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Set the encrypted exchange credentials in the user's document
        await setDoc(userDocRef, {
          ...userData,  
          exchangeCredentials: {
            platform: exchangePlatform,
            apiKey: encryptedApiKey,
            apiSecret: encryptedApiSecret,
          },
        }, { merge: true }); 

        setExchangeAdded(true);  // Set exchangeAdded to true
        setSuccessMessage("API Key and Secret added successfully!");
        setApiKey("");
        setApiSecret("");
      } else {
        setErrorMessage("User not found.");
      }
    } catch (error) {
      console.error("Error submitting API credentials:", error);
      setErrorMessage("Failed to save credentials. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // If exchange added successfully, show CryptoAnalyzer; otherwise, show AddExchange form
  if (exchangeAdded) {
    return <CryptoAnalyzer />;
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-900 text-white flex justify-center ">
=======
    <div className="min-h-screen bg-gray-dark text-white flex justify-center ">
>>>>>>> ui-update
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Add Your Exchange API Key</h1>
        
       
        {/* Error and Success Messages */}
        {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}

        {/* AddExchange form if exchange not added yet */}
        {!exchangeAdded && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="exchangePlatform" className="block text-lg font-medium mb-2">
                Select Exchange Platform:
              </label>
              <select
                id="exchangePlatform"
                value={exchangePlatform}
                onChange={(e) => setExchangePlatform(e.target.value)}
<<<<<<< HEAD
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
=======
                className="w-full p-2 bg-gray-medium text-white border border-gray-600 rounded-lg"
>>>>>>> ui-update
              >
                <option value="binance">Binance</option>
                <option value="bingx">BingX</option>
                <option value="bybit">Bybit</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="apiKey" className="block text-lg font-medium mb-2">
                API Key:
              </label>
              <input
                type="text"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API Key"
                required
<<<<<<< HEAD
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
=======
                className="w-full p-2 bg-gray-medium text-white border border-gray-600 rounded-lg"
>>>>>>> ui-update
              />
            </div>

            <div className="mb-6">
              <label htmlFor="apiSecret" className="block text-lg font-medium mb-2">
                API Secret:
              </label>
              <input
                type="password"
                id="apiSecret"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                placeholder="Enter your API Secret"
                required
<<<<<<< HEAD
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
=======
                className="w-full p-2 bg-gray-medium text-white border border-gray-600 rounded-lg"
>>>>>>> ui-update
              />
            </div>

            <button
              type="submit"
<<<<<<< HEAD
              className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
=======
              className="w-full p-3 bg-blue text-white font-semibold rounded-lg hover:bg-blue-medium transition-colors"
>>>>>>> ui-update
            >
                       {loading ? "Submiting..." : "Submit API Key"}

            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddExchange;
