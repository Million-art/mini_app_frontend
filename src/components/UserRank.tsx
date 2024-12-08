import { retrieveLaunchParams } from '@telegram-apps/sdk';


const { initData } = retrieveLaunchParams();
export const telegramId = initData?.user?.id;
export const userName = initData?.user?.username;
export const firstName = initData?.user?.firstName || "User";
export const lastName = initData?.user?.lastName || "";
export const referredBy = initData?.startParam;

const UserRank = () => {
    const user = {
        userImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        firstName: "Joni",
        rank: 5,
        maxRank: 1000,
    };

    const progressPercentage = (user.rank / user.maxRank) * 100;

    return (
        <div className="flex items-center mx-4 mt-6 bg-gray-900 p-4 rounded-lg shadow-lg">
            <div className="z-20">
                <div className="border-4 border-blue-700 flex items-center justify-center rounded-full bg-gray-800 w-14 h-14 overflow-hidden">
                    {user.userImage ? (
                        <img
                            className="object-cover w-full h-full"
                            src={user.userImage}
                            alt={`${user.firstName}'s profile`}
                        />
                    ) : (
                        <div className="text-2xl text-white bg-black w-14 h-14 flex items-center justify-center">
                            {user.firstName.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
            </div>
            <div className="ml-4 w-full">
                <h1 className="text-white text-lg font-semibold">
                    Welcome, {firstName}
                </h1>
                <p className="text-sm mb-2 tracking-wider text-gray-300">
                    Your rank: {user.rank} of {user.maxRank}
                </p>
                <div className="flex items-center">
                    <div className="w-full h-3 bg-gray-700 rounded-full relative overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                    <span className="ml-2 text-sm text-gray-300">
                        {progressPercentage.toFixed(1)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default UserRank;
