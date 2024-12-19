import { FaBitcoin } from "react-icons/fa";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useCallback, useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { telegramId } from "../libs/telegram";

const Wallets = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const tid = String(telegramId);

  const handleWalletConnection = useCallback(async (address: string) => {
    setTonWalletAddress(address);
    setIsLoading(false);

    try {
      const userRef = doc(db, "users", tid);
      await updateDoc(userRef, {
        walletAddress: address,
      });
    } catch (error) {
      console.error("Error updating wallet address in Firebase:", error);
    }
  }, []);

  const handleWalletDisconnect = useCallback(async () => {
    setTonWalletAddress(null);
    setIsLoading(false);

    try {
      const userRef = doc(db, "users", tid);
      await updateDoc(userRef, {
        walletAddress: null,
      });
    } catch (error) {
      console.error("Error resetting wallet address in Firebase:", error);
    }
  }, []);

  const handleConfirmDisconnect = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);
    await tonConnectUI.disconnect();
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address) {
        await handleWalletConnection(tonConnectUI.account.address);
      } else {
        await handleWalletDisconnect();
      }
    };

    checkWalletConnection();

    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnection(wallet.account.address);
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

  const formatAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-6)}`;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-900 to-black">
        <div className="bg-gray-700 font-bold py-3 px-6 rounded-lg shadow-lg text-yellow-300 animate-pulse">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-black py-8 px-4">
      <FaBitcoin className="w-28 h-28 text-yellow-400 mb-6 animate-pulse" />
      {tonWalletAddress ? (
        <div className="flex flex-col items-center">
          <p className="mb-4 text-white text-lg">
            Connected:{" "}
            <b className="text-yellow-300">{formatAddress(tonWalletAddress)}</b>
          </p>
          <button
            onClick={handleWalletAction}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-110"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={handleWalletAction}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-110"
        >
          Connect Ton Wallet
        </button>
      )}

      <div className="mt-12 text-center">
        <p className="text-4xl font-bold text-white">AirDrop</p>
        <p className="text-lg text-gray-400 mt-2">Coming very soon! 👀</p>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl transform transition-all duration-300 scale-105">
            <p className="mb-6 text-white text-lg">
              Are you sure you want to disconnect your wallet?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="text-gray-300 font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDisconnect}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-400 transition-colors"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallets;
