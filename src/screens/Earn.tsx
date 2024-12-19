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

<<<<<<< HEAD
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // To store the task selected by the user
  const [showPopup, setShowPopup] = useState(false); // To control popup visibility
  const dispatch = useDispatch();

  // Open popup with task details
=======
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();

>>>>>>> ui-update
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowPopup(true);
  };

<<<<<<< HEAD
  // Close popup
=======
>>>>>>> ui-update
  const closePopup = () => {
    setShowPopup(false);
    setSelectedTask(null);
  };

<<<<<<< HEAD
  // Handle Claim Reward
  const handleClaimReward = (taskId: string) => {
    // Dispatch success message
=======
  const handleClaimReward = (taskId: string) => {
>>>>>>> ui-update
    dispatch(
      setShowMessage({
        message: "Congratulations! Reward claimed successfully.",
        color: "green",
      })
    );

<<<<<<< HEAD
    // Update tasks immutably
=======
>>>>>>> ui-update
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, claimed: true } : task
      )
    );
<<<<<<< HEAD

    // Close the popup
=======
>>>>>>> ui-update
    closePopup();
  };

  return (
<<<<<<< HEAD
    <div className="text-white mb-24">
      {/* Earn Coins Header */}
      <div className="flex items-center justify-center py-8">
        <div className="rounded-full p-4">
          <FaMoneyBillAlt className="w-28 h-28 text-blue-500" />
        </div>
      </div>
      <p className="text-center font-bold text-3xl">Earn coins</p>

      {/* Task List */}
      <div className="mx-4 mt-8">
        <p className="text-lg font-bold mb-4">Important tasks</p>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between bg-gray-800 p-4 rounded-lg mb-4 cursor-pointer hover:bg-gray-700"
            onClick={() => handleTaskClick(task)}
          >
            <div>
              <p className="font-bold">{task.name}</p>
              <p className="text-gray-400">Reward: {task.reward} coins</p>
            </div>
            <button
              className={`px-4 py-2 rounded-lg ${
                task.claimed
                  ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              disabled={task.claimed}
            >
              {task.claimed ? "Claimed" : "Claim"}
            </button>
          </div>
        ))}
=======
    <div className="text-white bg-gray-deep min-h-screen">
      {/* Header */}
      <div className="flex flex-col items-center justify-center py-6 bg-gray-dark shadow-lg">
        <FaMoneyBillAlt className="text-yellow-500 w-20 h-20 mb-4" />
        <h1 className="text-4xl font-bold">Earn Coins</h1>
        <p className="text-gray-400 mt-2">Complete tasks to earn rewards!</p>
      </div>

      {/* Task List */}
      <div className="mx-4 mt-8">
        <h2 className="text-lg font-bold mb-4 text-yellow-light">Important Tasks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-dark p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
              onClick={() => handleTaskClick(task)}
            >
              <h3 className="text-xl font-bold text-yellow-light">{task.name}</h3>
              <p className="text-gray-400 mt-2">Reward: {task.reward} coins</p>
              <button
                className={`mt-4 px-4 py-2 w-full rounded-lg font-bold transition duration-300 ${
                  task.claimed
                    ? "bg-gray-medium text-gray-400 cursor-not-allowed"
                    : "bg-yellow text-black hover:bg-yellow-light"
                }`}
                disabled={task.claimed}
              >
                {task.claimed ? "Claimed" : "Claim"}
              </button>
            </div>
          ))}
        </div>
>>>>>>> ui-update
      </div>

      {/* Task Popup */}
      {showPopup && selectedTask && (
<<<<<<< HEAD
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg max-w-lg w-full relative">
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            {/* Task Details */}
            <h2 className="text-xl font-bold mb-4">{selectedTask.name}</h2>
            <p className="mb-4">Reward: {selectedTask.reward} coins</p>
            <p className="mb-6">
=======
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg max-w-md w-full shadow-lg relative">
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedTask.name}</h2>
            <p className="mb-4">Reward: {selectedTask.reward} coins</p>
            <p className="mb-6 text-gray-400">
>>>>>>> ui-update
              Complete the task by visiting the link below:
            </p>
            <a
              href={selectedTask.link}
              target="_blank"
              rel="noopener noreferrer"
<<<<<<< HEAD
              className="text-blue-500 hover:underline"
            >
              {selectedTask.link}
            </a>

            {/* Claim Button */}
            <div className="mt-6">
              <button
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
=======
              className="text-yellow-light hover:underline"
            >
              {selectedTask.link}
            </a>
            <div className="mt-6">
              <button
                className="px-4 py-2 w-full bg-yellow rounded-lg text-black font-bold hover:bg-yellow-light transition duration-300"
>>>>>>> ui-update
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
