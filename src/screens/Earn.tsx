import { useState } from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setShowMessage } from "@/store/slice/messageSlice";
import "react-toastify/dist/ReactToastify.css";

interface Task {
  id: string;
  name: string;
  link: string;
  reward: number;
  claimed: boolean;
}

const Earn = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "binance",
      name: "Create Binance Account",
      link: "https://www.binance.com",
      reward: 10000,
      claimed: false,
    },
    {
      id: "bingx",
      name: "Create BingX Account",
      link: "https://www.bingx.com",
      reward: 12000,
      claimed: false,
    },
    {
      id: "bybit",
      name: "Create Bybit Account",
      link: "https://www.bybit.com",
      reward: 15000,
      claimed: false,
    },
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedTask(null);
  };

  const handleClaimReward = (taskId: string) => {
    dispatch(
      setShowMessage({
        message: "Congratulations! Reward claimed successfully.",
        color: "green",
      })
    );

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, claimed: true } : task
      )
    );
    closePopup();
  };

  return (
    <div className="text-white bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col items-center justify-center py-8 justify-center bg-gradient-to-r from-gray-900 to-black shadow-lg rounded-b-xl">
        <FaMoneyBillAlt className="text-yellow-400 w-20 h-20 mb-4 animate-pulse" />
        <h1 className="text-4xl font-extrabold text-white tracking-wide">Earn Coins</h1>
        <p className="text-gray-300 mt-2">Complete tasks and earn rewards!</p>
      </div>

      {/* Task List */}
      <div className="mx-4 mt-8">
        <h2 className="text-lg font-bold mb-4 text-yellow-300">Important Tasks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gradient-to-t from-gray-800 via-gray-900 to-gray-700 p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => handleTaskClick(task)}
            >
              <h3 className="text-xl font-semibold text-yellow-400">{task.name}</h3>
              <p className="text-gray-400 mt-2">Reward: {task.reward} coins</p>
              <button
                className={`mt-4 px-4 py-2 w-full rounded-lg font-semibold transition duration-300 ${
                  task.claimed
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-yellow-500 text-black hover:bg-yellow-400"
                }`}
                disabled={task.claimed}
              >
                {task.claimed ? "Claimed" : "Claim"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Task Popup */}
      {showPopup && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-8 rounded-xl max-w-md w-full shadow-lg relative transform transition-all duration-300 scale-105">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">{selectedTask.name}</h2>
            <p className="mb-4">Reward: {selectedTask.reward} coins</p>
            <p className="mb-6 text-gray-400">
              Complete the task by visiting the link below:
            </p>
            <a
              href={selectedTask.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:underline"
            >
              {selectedTask.link}
            </a>
            <div className="mt-6">
              <button
                className="px-4 py-2 w-full bg-yellow-500 rounded-lg text-black font-bold hover:bg-yellow-400 transition duration-300"
                onClick={() => handleClaimReward(selectedTask.id)}
                disabled={selectedTask.claimed}
              >
                {selectedTask.claimed ? "Claimed" : "Claim Reward"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Earn;
