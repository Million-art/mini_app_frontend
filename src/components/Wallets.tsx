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
  const tid = String(telegramId)
  const handleWalletConnection = useCallback(
    async (address: string) => {
      setTonWalletAddress(address);
      console.log("Wallet connected:", address);
      setIsLoading(false);

      try {
        const userRef = doc(db, "users", tid); // Use tid to locate the user
        await updateDoc(userRef, {
          walletAddress: address, // Update the walletAddress field
        });
       } catch (error) {
        console.error("Error updating wallet address in Firebase:", error);
      }
    },
    []
  );

  const handleWalletDisconnect = useCallback(async () => {
    setTonWalletAddress(null);
     setIsLoading(false);

    try {
      const userRef = doc(db, "users", tid); // Use tid to locate the user
      await updateDoc(userRef, {
        walletAddress: null, // Reset the walletAddress field to "none"
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
      setShowConfirmModal(true); // Show the confirmation modal
    } else {
      await tonConnectUI.openModal();
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
 
        <div className="bg-gray-medium font-bold py-2 px-4 rounded">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
 
      <FaBitcoin className="w-28 h-28 object-contain text-yellow" />
      {tonWalletAddress ? (
        <div className="flex flex-col items-center">
          <p className="mb-4 text-white">
            Connected: <b className="text-yellow-light">{formatAddress(tonWalletAddress)}</b>
          </p>
          <button
            onClick={handleWalletAction}
            className="bg-yellow hover:bg-blue-yellow-light text-white font-bold py-2 px-4 rounded"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={handleWalletAction}

          className="bg-yellow hover:bg-yellow-light text-white font-bold py-2 my-5 px-4 rounded"
        >
          Connect Ton Wallet
        </button>
      )}
      <p className="text-center font-bold text-white text-3xl">AirDrop</p>
      <p className="text-center text-white text-lg mt-2">Coming very soon!👀</p>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg">
            <p className="mb-4 text-white">Are you sure you want to disconnect your wallet?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className=" text-gray-200 font-thin py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDisconnect}
                className=" text-red-500 font-tin py-2 px-4 rounded"
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