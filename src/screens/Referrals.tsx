import { useState, useEffect } from "react";
import { FaGift } from "react-icons/fa";
import { FaCopy } from "react-icons/fa"; 
import { telegramId } from "@/libs/telegram";
import { User } from "@/interface/User";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";  

const Referrals = () => {
  const [referrals, setReferrals] = useState<User[]>([]);  
  const [isCopied, setIsCopied] = useState(false);
  const id = String(telegramId)
  const invitationLink = `https://t.me/john_sart_bot?start=ref_${id}`;
 
  // Fetch referred users from Firestore
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        // Query Firestore to get users who were referred by the current user (based on telegramId)
        const q = query(collection(db, "users"), where("referredBy", "==", id));

        const querySnapshot = await getDocs(q);
  
        // Store the referred users in an array
        const referredUsers: User[] = [];
        querySnapshot.forEach((doc) => {
          referredUsers.push({ ...doc.data(), id: doc.id } as User);  
        });
  
         setReferrals(referredUsers);
      } catch (error) {
        console.error("Error fetching referrals: ", error);
      }
    };
  
    fetchReferrals();
  }, []);
  
  // Function to copy the invitation link to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(invitationLink).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="text-white bg-gray-deep ">
      <p className="pt-4 text-center font-bold text-4xl">Invite friends</p>
      <p className="text-center mt-4 mx-4">
        You can receive 10% of your invited friend's mined coins
      </p>
      <div className="bg-gray-dark mt-6 mx-4 rounded-lg p-2 flex items-center">
        <div>
          <FaGift className="w-20 h-20 object-contain text-yellow" />
        </div>
        <div className="mx-3 w-full">
          <p className="text-lg font-bold">Invite a friend</p>
          <p className="font-bold">+$ 100,000</p>
        </div>
      </div>
      <div className="bg-gray-dark mt-6 mx-4 rounded-lg p-2 flex items-center">
        <div>
          <FaGift className="w-20 h-20 object-contain text-yellow" />
        </div>
        <div className="mx-3 w-full">
          <p className="text-lg font-bold">Invite a friend with Telegram Premium</p>
          <p className="font-bold">+$ 50,000</p>
        </div>
      </div>

      <div className="bg-gray-dark mt-6 mx-4 rounded-lg p-2 flex items-center">
        <div className="flex w-full">
          <div className="flex-grow min-w-0 mr-2">
            <p
              className="bg-gray-dark rounded-md py-1 px-2 break-words h-full"
            >
              {invitationLink}
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col justify-between">
            <button
              className="bg-blue mb-2 hover:bg-yellow-light text-white text-sm font-bold p-2 rounded whitespace-nowrap"
              onClick={copyToClipboard}
            >
              <FaCopy size={16} />
              {isCopied ? " Copied!" : " Copy"}
            </button>
            <button
              className="bg-blue mb-2 hover:bg-yellow-light text-white text-sm font-bold p-2 rounded whitespace-nowrap"
            >
              Invite
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-dark mx-4 py-2 mt-6 h-60 rounded-lg overflow-hidden overflow-y-auto hide-scrollbar mb-2">
        {referrals.length > 0 ? (
          referrals.map(({ balance, firstName, lastName, userImage }, idx) => (
            <div key={idx} className={`flex items-center px-2 py-1 w-full`}>
              <div className="flex-shrink-0 mr-4">
                <div className="bg-zinc-950 flex items-center justify-center rounded-full h-8 w-8">
                  <p className="text-white text-sm">{idx + 1} </p>
                </div>
              </div>
              <div className="flex-shrink-0 mr-2">
                <div className="border-2 border-yellow-700 overflow-hidden flex items-center justify-center rounded-full bg-gray-dark h-10 w-10">
                  {userImage ? (
                    <img
                      className="w-9 h-9 object-contain"
                      src={userImage}
                      alt={firstName.toUpperCase()}
                    />
                  ) : (
                    <div className="text-xl text-white bg-black w-14 h-14 items-center justify-center">
                      {firstName.toUpperCase()}
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
        ) : (
          <div className="flex items-center justify-center h-full text-lg text-white text-center">
            <p>you didn't invite riends yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Referrals;
