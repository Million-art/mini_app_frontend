import React, { useState } from "react";

const CryptoAnalyzer: React.FC = () => {
  const [symbol, setSymbol] = useState<string>("");
  const [timeframe, setTimeframe] = useState<string>("1 Hour");

  const handleAnalyze = (event: React.FormEvent) => {
    event.preventDefault();
     console.log("Analyzing:", { symbol, timeframe });
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
            className=" px-4 py-2 border rounded-md focus:ring text-black focus:ring-blue-300 focus:outline-none"
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
    </div>
  );
};

export default CryptoAnalyzer;
