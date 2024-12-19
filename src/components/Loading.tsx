import { FiLoader } from "react-icons/fi"

const Loading = () => {
  return (
 
    <div className="flex items-center justify-center h-screen bg-gray-dark">
      <div className="flex flex-col items-center">
        <FiLoader className="text-5xl text-yellow animate-spin" />
        <p className="mt-4 text-lg text-yellow-light">Loading...</p>
      </div>
    </div>
  )
}

export default Loading