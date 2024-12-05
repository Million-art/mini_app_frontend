import { FaCalendarCheck } from "react-icons/fa"

const Daily = () => {
  const isClaimed = false;
  const claimdisabled = false;
  return (
    <div className="text-white">
      <div className="flex items-center justify-center py-10">
        <div className="rounded-full p-4">
          <FaCalendarCheck className="w-28 h-28 object-contain text-cyan-500" />
        </div>
      </div>
      <p className="text-center font-bold text-3xl">Daily rewards</p>
      <p className="text-center text-lg mt-2">
        Here you can claim your daily rewards
      </p>
      <p className="text-center text-xl font-bold mt-4 ">(Day 3)</p>
      <div className="mx-10 mt-20">
        {
          isClaimed ? (
            <button
              disabled
              className="w-full bg-gray-500 text-white font-bold py-2 rounded cursor-not-allowed"
            >
              Claimed for today
            </button>
          ) : (
            <button
              disabled
              className={`w-full ${claimdisabled ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 rounded`}
            >
              Claim $ 10,000
            </button>
          )
        }
      </div>
    </div>
  )
}

export default Daily