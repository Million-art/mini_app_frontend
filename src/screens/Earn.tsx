import LinklButton from "@/components/LinklButton"
import { FaMoneyBillAlt } from "react-icons/fa"

const Earn = () => {
  return (
    <div className="text-white mb-24">
      <div className="flex items-center justify-center py-8">
        <div className="rounded-full p-4">
          <FaMoneyBillAlt className="w-28 h-28 text-green-400" />
        </div>
      </div>
      <p className="text-center font-bold text-3xl">Earn coins</p>
      <div className="mx-4 mt-8">
        <p className="text-lg font-bold mb-4">Important tasks</p>
        <LinklButton
          image="youtube"
          name="Watch Video"
          amount={10000}
          isClicked={true}
          checking={false}
          isClaimed={false}
          canClaim={true}
        />


      </div>
    </div>
  )
}

export default Earn