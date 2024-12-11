import React, { useState } from "react";
import chart from "../assets/OIP (2).jpg"
const CryptoAnalyzer: React.FC = () => {
  const [symbol, setSymbol] = useState<string>("");
  const [timeframe, setTimeframe] = useState<string>("1 Hour");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleAnalyze = (event: React.FormEvent) => {
    event.preventDefault();
     console.log("Analyzing:", { symbol, timeframe });
     setShowPopup(true); 

  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex justify-center   ">
      <form
        onSubmit={handleAnalyze}
        className="  shadow-md rounded-lg p-6 w-96"
      >
        <h2 className="text-xl text-white font-semibold text-center mb-3">
          Advanced Crypto Analyzer
        </h2>
        <p className="text-sm text-white text-center mb-5">
          Analyze cryptocurrency using EMA, ADX, Volume, and Fibonacci levels
        </p>
        <div className="flex gap-2 text-white">
        <div className="mb-4 ">
          <label htmlFor="symbol" className="block text-sm font-medium mb-2">
            Symbol (e.g., BTCUSDT)
          </label>
          <input
            type="text"
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Enter symbol"
            className=" px-4 w-48 py-2 border rounded-md focus:ring text-black focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="timeframe" className="block text-sm font-medium mb-2">
            Timeframe
          </label>
          <select
            id="timeframe"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring text-black focus:ring-blue-300 focus:outline-none"
          >
            <option value="1 Hour">1 Hour</option>
            <option value="4 Hours">4 Hours</option>
            <option value="1 Day">1 Day</option>
            <option value="1 Week">1 Week</option>
          </select>
        </div>
        </div>
        

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Analyze →
        </button>
      </form>
        {/* Popup for displaying mock analysis */}
        {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-96">
            <img src={chart} alt="" className="w-full h-36 " />
            <h3 className="text-lg font-semibold text-center mb-4">RSR /USDT Long 📈</h3>
            <p className="text-sm mb-2">Entry: $0.0175 / $0.0165</p>
            <p className="text-sm mb-2">TP 1: $0.0183</p>
            <p className="text-sm mb-2">TP 2: $0.0196</p>
            <p className="text-sm mb-2">TP 3: $0.0210</p>
            <p className="text-sm mb-2">Leverage: 20X</p>
            <p className="text-sm mb-4">Using 3% portfolio</p>
            <h3 className="text-lg font-semibold text-center mb-4">
              BTCUSDT Spot 📊
            </h3>
            <p className="text-sm mb-4 text-center">
              <span className="font-semibold">Entry Zones</span>
            </p>
            <ul className="text-sm mb-4 space-y-2">
              <li>
                <span className="font-semibold">1st tranche</span>: 20% of the
                operative capital — <span className="text-green-400">$89,000</span>
              </li>
              <li>
                <span className="font-semibold">2nd tranche</span>: 30% of the
                operative capital — <span className="text-green-400">$85,000</span>
              </li>
              <li>
                <span className="font-semibold">3rd tranche</span>: 50% of the
                operative capital — <span className="text-green-400">$80,000</span>
              </li>
            </ul>
            <button
              onClick={closePopup}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoAnalyzer;
