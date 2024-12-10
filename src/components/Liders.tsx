import { useEffect, useState } from "react";
import { db } from "@/firebase";  
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

// Define the type for the user
type TopUser = {
    id: string;
    balance: number;
    firstName: string;
    lastName: string;
    userImage?: string;
};

const Liders = () => {
    const [topUsers, setTopUsers] = useState<TopUser[]>([]);   
    const user = {
        uid: "5",  
    };

    useEffect(() => {
        const fetchTopUsers = async () => {
            try {
                // Create a query to get users sorted by balance in descending order, limiting to top 10
                const q = query(
                    collection(db, "users"),  
                    orderBy("balance", "desc"),
                    limit(10)
                );

                // Execute the query
                const querySnapshot = await getDocs(q);
                const usersData: TopUser[] = querySnapshot.docs.map(doc => {
                    const data = doc.data(); // Get the document data
                    return {
                        id: doc.id,  
                        balance: data.balance || 0,   
                        firstName: data.firstName || "Unknown",   
                        lastName: data.lastName || " ",  
                        userImage: data.userImage,  // Optional field
                    };
                });

                setTopUsers(usersData);  // Set the top users to state
            } catch (error) {
                console.error("Error fetching top users:", error);
            }
        };

        fetchTopUsers();  
    }, []);

    return (
        <div className="bg-gray-800 mx-4 mt-6 mb-24 h-60 rounded-lg relative">
            <div className="h-full overflow-y-auto hide-scrollbar pb-12">
                {topUsers.length === 0 ? (
                    <p className="text-white text-center">Loading top users...</p>
                ) : (
                    topUsers.map(({ id, balance, firstName, lastName, userImage }, idx) => (
                        <div
                            key={idx}
                            className={`${id === user.uid && "bg-gray-900"} flex items-center px-2 py-1 w-full`}
                        >
                            <div className="flex-shrink-0 mr-4">
                                <div className="bg-zinc-950 flex items-center justify-center rounded-full h-8 w-8">
                                    <p className="text-white text-sm">{idx + 1}</p>
                                </div>
                            </div>
                            <div className="flex-shrink-0 mr-2">
                                <div className="border-2 border-yellow-700 overflow-hidden flex items-center justify-center rounded-full bg-gray-800 h-10 w-10">
                                    {userImage ? (
                                        <img
                                            className="w-9 h-9 object-contain"
                                            src={userImage}
                                            alt={firstName.charAt(0).toUpperCase()}
                                        />
                                    ) : (
                                        <div className="text-xl text-white bg-black w-14 h-14 items-center justify-center">
                                        {firstName.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex-grow min-w-0 flex items-center justify-between">
                                <p className="text-white font-bold truncate mr-2">
                                    {firstName} {lastName}
                                </p>
                                <p className="text-white whitespace-nowrap flex-shrink-0">
                                    $ {balance}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Liders;
