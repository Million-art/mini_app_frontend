import { FaBitcoin } from "react-icons/fa"

const AirDrops = () => {
  return (
    <div className="text-white">
        <div className="flex items-center justify-center pt-28 pb-10">
          <div className="rounded-full p-4">
          <FaBitcoin className="w-28 h-28 object-contain text-cyan-500" />
          </div>
        </div>
        <p className="text-center font-bold text-3xl">AirDrop</p>
        <p className="text-center text-lg mt-2">Coming very soon!</p>
    </div>
  )
}

export default AirDrops