import { FaCheck, FaTelegram, FaUsers, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface LinklButtonProps {
  image: string;
  name: string;
  amount: number;
  link?: string;
  isClicked: boolean;
  checking: boolean;
  isClaimed: boolean;
  canClaim: boolean;
}

const LinklButton: React.FC<LinklButtonProps> = ({
  image,
  name,
  amount,
  isClicked,
  checking,
  isClaimed,
  canClaim,
}) => {
  return (
    <div className="bg-gray-900 rounded-xl flex items-center p-2 mb-2 cursor-pointer">
      {/* Icon Section */}
      <div className="flex items-center justify-center w-[80px] text-2xl text-white">
        {image === "youtube" ? (
          <FaYoutube />
        ) : image === "telegram" ? (
          <FaTelegram />
        ) : image === "x" ? (
          <FaXTwitter />
        ) : image === "referral" ? (
          <FaUsers />
        ) : null}
      </div>

      {/* Content Section */}
      <div className="mx-3 w-full">
        <p className="text-sm text-gray-300">{name}</p>
        <p className="font-bold text-white">+${amount}</p>
      </div>

      {/* Action Section */}
      {isClicked && (
        <div>
          {checking ? (
            <div className="mr-2 text-gray-400">Loading...</div>
          ) : (
            <div className="mr-1" onClick={(e) => e.stopPropagation()}>
              {isClaimed ? (
                <FaCheck className="text-green-500" aria-label="Claimed" />
              ) : canClaim ? (
                <button
                  // Uncomment and implement claimRewards function as needed
                  // onClick={claimRewards}
                  className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold px-2 py-1 rounded"
                  aria-label="Claim Reward"
                >
                  Claim
                </button>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LinklButton;