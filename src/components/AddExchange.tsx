import { useState } from "react";

const AddExchange = () => {
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [exchangePlatform, setExchangePlatform] = useState("binance");

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Logic to handle the submitted API credentials (save them, or use them to connect to the exchange)
    console.log(`Submitted API Key and Secret for ${exchangePlatform}`);
    console.log(`API Key: ${apiKey}`);
    console.log(`API Secret: ${apiSecret}`);
  };

  return (
    <div className="min-h-screen bg-gray-900  text-white flex justify-center   py-10">
      <div className="  p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Add Your Exchange API key</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="exchangePlatform" className="block text-lg font-medium mb-2">
              Select Exchange Platform:
            </label>
            <select
              id="exchangePlatform"
              value={exchangePlatform}
              onChange={(e) => setExchangePlatform(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
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
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
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
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit API Key
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExchange;
