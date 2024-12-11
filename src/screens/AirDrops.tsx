import { FaBitcoin } from "react-icons/fa";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useCallback, useEffect, useState } from "react";

const AirDrops = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleWalletConnection = useCallback((address: string) => {
    setTonWalletAddress(address);
    console.log("Wallet connected:", address);
    setIsLoading(false);
  }, []);

  const handleWalletDisconnect = useCallback(() => {
    setTonWalletAddress(null);
    console.log("Wallet disconnected:");
    setIsLoading(false);
  }, []);

  const handleConfirmDisconnect = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);
    await tonConnectUI.disconnect();
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address) {
        handleWalletConnection(tonConnectUI.account.address);
      } else {
        handleWalletDisconnect();
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
        <div className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <FaBitcoin className="w-28 h-28 object-contain text-cyan-500" />
      {tonWalletAddress ? (
        <div className="flex flex-col items-center">
          <p className="mb-4 text-white">
            Connected: <b className="text-blue-500">{formatAddress(tonWalletAddress)}</b>
          </p>
          <button
            onClick={handleWalletAction}
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={handleWalletAction}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-5 px-4 rounded"
        >
          Connect Ton Wallet
        </button>
      )}
      <p className="text-center font-bold text-white text-3xl">AirDrop</p>
      <p className="text-center text-white text-lg mt-2">Coming very soon!👀</p>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="mb-4">Are you sure you want to disconnect your wallet?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDisconnect}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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

export default AirDrops;
