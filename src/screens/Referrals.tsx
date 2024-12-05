import { FaGift } from "react-icons/fa"

const Referrals = () => {
  return (
    <div className="text-white mb-24">
      <p className="mt-4 text-center font-bold text-4xl">Invite friends</p>
      <p className="text-center mt-4 mx-4">
        You can receive 10% of your invited friend's mined coins
      </p>
      <div className="bg-gray-800 mt-6 mx-4 rounded-lg p-2 flex items-center">
        <div>
          <FaGift className="w-20 h-20 object-contain text-orange-400" />
        </div>
        <div className="mx-3 w-full">
            <p className="text-lg font-bold">Invite a friend</p>
            <p className="font-bold">+$ 100,000</p>
        </div>
      </div>
      <div className="bg-gray-800 mt-6 mx-4 rounded-lg p-2 flex items-center">
        <div>
          <FaGift className="w-20 h-20 object-contain text-orange-400" />
        </div>
        <div className="mx-3 w-full">
            <p className="text-lg font-bold">Invite a friend with Telegram Premium</p>
            <p className="font-bold">+$ 50,000</p>
        </div>
      </div>

      <div className="bg-gray-800 mt-6 mx-4 rounded-lg p-2 flex items-center">
        <div className="flex">
          <div className="flex-grow min-w-0 mr-2">
              <p
               className="bg-gray-700 rounded-md py-1 px-2 break-words h-full"
               >
                https://t.me/bot?user=09ed09kdlld34z9
              </p>
          </div>
          <div className="flex-shrink-0 flex flex-col">
            <button
             className="bg-blue-500 mb-2 hover:bg-blue-700 text-white text-sm"
            >
              Copy
            </button>
            <button
             className="bg-blue-500 mb-2 hover:bg-blue-700 text-white text-sm"
            >
              Invite
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Referrals