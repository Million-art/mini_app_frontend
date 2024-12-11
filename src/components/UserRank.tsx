import { useState, useEffect } from "react";
import { db } from "@/firebase"; 
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { telegramId, profilePicture } from "@/libs/telegram"; 
import Loading from "./Loading";
interface User {
    id: string;
    balance: number;
    firstName: string;
    lastName: string;
    userImage: string | null;
    rank?: number;  
}

const UserRank = () => {
    const id = String(telegramId);  
    const [user, setUser] = useState<any>(null);  
    const [totalUsers, setTotalUsers] = useState(0);   
    const [loading, setLoading] = useState(true);   

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch all user documents
                const userCollectionRef = collection(db, "users");
                const userSnapshot = await getDocs(userCollectionRef);

                const usersList: User[] = [];
                userSnapshot.forEach(doc => {
                    const data = doc.data();
                    usersList.push({
                        id: doc.id,
                        balance: data.balance || 0,  
                        firstName: data.firstName,
                        lastName: data.lastName,
                        userImage: data.userImage,
                    });
                });

                // Sort users based on balance in descending order (highest balance first)
                const sortedUsers = usersList.sort((a, b) => b.balance - a.balance);

                // Set the total number of users
                setTotalUsers(sortedUsers.length);

                // Find the rank of the current user
                const currentUserIndex = sortedUsers.findIndex(user => user.id === id);
                const rank = currentUserIndex + 1;  // Rank is index + 1

                // Find the specific user document using telegramId (id)
                const userRef = doc(db, "users", id);   // id is the user telegram id
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data();

                    setUser({
                        ...userData,  // Set the user data from Firestore
                        id: userSnap.id,
                        rank,  // Set the rank based on the position in the sorted list
                    });
                } else {
                    console.log(`No user found with telegramId: ${id}`);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id]);   

    if (loading) {
        return  <Loading />  
    }

    if (!user) {
        return <p>No user data found.</p>;  // Handle case where user is not found
    }

    return (
        <div className="flex items-center   bg-gray-900 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        {/* Profile Picture Section */}
        <div className="z-20">
          <div className="border-4 border-blue-700 flex items-center justify-center rounded-full bg-gray-800 w-16 h-16 overflow-hidden">
            {user ? (
              <img
                className="object-cover w-full h-full"
                src={profilePicture}
                alt={`${user.firstName}'s profile`}
              />
            ) : (
              <div className="text-2xl text-white bg-black w-16 h-16 flex items-center justify-center">
                {user.firstName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      
        {/* User Info Section */}
        <div className="ml-4 w-full">
          <div className="mb-3">
            <h1 className="text-white text-2xl font-semibold">
              {`Welcome, ${user.firstName}`}   
            </h1>
            <p className="text-gray-400 text-sm mt-1">{`Balance: ${user.balance}$`}</p>
          </div>
      
          {/* Rank Section */}
          <p className="text-sm mb-4 tracking-wider text-gray-300">
            Your rank: {user.rank} of {totalUsers}
          </p>
      
          {/* Progress Bar Section */}
          {/* <div className="flex items-center">
            <div className="w-full h-3 bg-gray-700 rounded-full relative overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
                style={{ width: `${(user.rank / totalUsers) * 100}%` }}  // Progress bar based on rank
              />
            </div>
            <span className="ml-2 text-sm text-gray-300">
              {((user.rank / totalUsers) * 100).toFixed(1)}%
            </span>
          </div> */}
        </div>
      </div>
      
    );
};

export default UserRank;
