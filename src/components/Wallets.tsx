import { FaBitcoin } from "react-icons/fa";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useCallback, useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { telegramId } from "../libs/telegram";

const Wallets = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
  const [jettons, setJettons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const tid = String(telegramId);

  const handleWalletConnection = useCallback(
    async (address: string) => {
      setTonWalletAddress(address);
      console.log("Wallet connected:", address);
      setIsLoading(false);

      try {
        const userRef = doc(db, "users", tid);
        await updateDoc(userRef, {
          walletAddress: address,
        });
      } catch (error) {
        console.error("Error updating wallet address in Firebase:", error);
      }
    },
    [tid]
  );

  const handleWalletDisconnect = useCallback(async () => {
    setTonWalletAddress(null);
    setIsLoading(false);
  
    try {
      // Remove jettons from localStorage
      localStorage.removeItem('jettons');
  
      // Reset wallet address in Firestore
      const userRef = doc(db, "users", tid);
      await updateDoc(userRef, {
        walletAddress: null,
      });
  
    } catch (error) {
      console.error("Error resetting wallet address in Firebase:", error);
    }
  }, [tid]);
  

  const handleConfirmDisconnect = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);
    await tonConnectUI.disconnect();
  };

  useEffect(() => {
    const fetchJettons = async (address: string) => {
      try {
        const url = `https://tonapi.io/v2/accounts/${address}/jettons?currencies=ton`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const parsedJettons = data.balances.map((jetton: any) => ({
            address: jetton.jetton.address,
            name: jetton.jetton.name,
            symbol: jetton.jetton.symbol,
            image: jetton.jetton.image,
            balance: jetton.balance,
          }));
  
          // Save parsedJettons to localStorage
          localStorage.setItem('jettons', JSON.stringify(parsedJettons));
          console.log(parsedJettons);
          setJettons(parsedJettons);
        } else {
          console.error("Failed to fetch jettons");
        }
      } catch (error) {
        console.error("Error fetching jettons:", error);
      }
    };
  
    const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address) {
        await handleWalletConnection(tonConnectUI.account.address);
        fetchJettons(tonConnectUI.account.address);
      } else {
        await handleWalletDisconnect();
      }
    };
  
    checkWalletConnection();
  
    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnection(wallet.account.address);
        fetchJettons(wallet.account.address);
      } else {
        handleWalletDisconnect();
      }
    });
  
    return () => unsubscribe();
  }, [tonConnectUI, handleWalletConnection, handleWalletDisconnect]);
  
  const handleWalletAction = async () => {
    if (tonConnectUI.connected) {
      setShowConfirmModal(true);
    } else {
      await tonConnectUI.openModal();
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-lg font-bold">
        <p className="animate-bounce text-yellow">Loading your Wallet... 🚀</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex flex-col items-center">
        <FaBitcoin className="w-16 h-16 text-yellow-light animate-pulse" />
        {tonWalletAddress ? (
          <div className="mt-4 text-center">
            <p className="text-white">
              Connected Wallet: <b className="text-yellow-light">{formatAddress(tonWalletAddress)}</b>
            </p>
            <button
              onClick={handleWalletAction}
              className="mt-4  text-black bg-yellow hover:bg-yellow-light font-bold py-2 px-4 rounded-lg shadow"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <button
            onClick={handleWalletAction}
            className="mt-4 bg-yellow hover:bg-yellow-light text-black font-bold py-2 px-4 rounded-lg shadow"
          >
            Connect Wallet
          </button>
        )}
      </div>

      <div className="mt-8 bg-gray-800 p-4 rounded-lg shadow-lg">
        <p className="text-center text-xl font-bold text-white">Your Tokens</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {jettons.length > 0 ? (
            jettons.map((jetton, index) => (
              <div
                key={index}
                className="p-4 bg-gray-700 text-white rounded-lg shadow-md flex flex-col items-center"
              >
                <img
                  src={jetton.image}
                  alt={jetton.name}
                  className="w-12 h-12 rounded-full mb-2"
                />
                <p className="font-bold">{jetton.name}</p>
                <p className="text-sm">Balance: {jetton.balance}{jetton.symbol}</p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-yellow-300">
              No tokens found! Connect your wallet to explore 🎉
            </p>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
            <p className="text-white mb-4">Are you sure you want to disconnect?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDisconnect}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallets;
