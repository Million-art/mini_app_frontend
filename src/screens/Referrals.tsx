import { useState, useEffect } from "react";
import { FaGift, FaCopy } from "react-icons/fa"; 
import { telegramId } from "@/libs/telegram";
import { User } from "@/interface/User";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";  
import { firstName } from "@/libs/telegram";

const Referrals = () => {
  const [referrals, setReferrals] = useState<User[]>([]);  
  const [isCopied, setIsCopied] = useState(false);
  const id = String(telegramId);
  const invitationLink = `https://t.me/john_sart_bot?start=ref_${id}`;

  // Fetch referred users from Firestore
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const q = query(collection(db, "users"), where("referredBy", "==", id));
        const querySnapshot = await getDocs(q);
  
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
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(invitationLink).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="justify-center bg-gradient-to-r from-gray-900 to-black min-h-screen text-white font-sans">
      <div className="container mx-auto py-8 px-4">
        <p className="text-center text-2xl font-extrabold tracking-wide mb-4">Invite Your Friends</p>
        <p className="text-center text-lg mb-8">Earn rewards when your friends join us!</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {/* Card 1 */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 p-3 rounded-lg shadow-xl flex items-center ">
            <FaGift className="w-12 h-12 text-white" />
            <div className="ml-4">
              <p className="font-semibold text-xl text-white">Invite a friend</p>
              <p className="font-bold text-2xl text-white">+ $100,000</p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-lg shadow-xl flex items-center">
            <FaGift className="w-12 h-12 text-white" />
            <div className="ml-4">
              <p className="font-semibold text-xl text-white">Invite a friend with Telegram Premium</p>
              <p className="font-bold text-2xl text-white">+ $50,000</p>
            </div>
          </div>
        </div>

        {/* Invitation Link Section */}
        <div className=" opacity-80 mt-6 p-6 rounded-lg shadow-xl flex items-center justify-between">
          <div className="flex-grow">
          <small>Here is Your Referral Link</small>

            <p className="bg-gray-800 text-white rounded-lg p-2 break-words">{invitationLink}</p>
          </div>
          <div className="ml-4">
            <button
              className="bg-blue-600 hover:bg-blue-500 text-white py-1 px-2 rounded-lg transition duration-300 ease-in-out shadow-md hover:scale-105"
              onClick={copyToClipboard}
            >
              <FaCopy className="inline-block mr-2" />
              {isCopied ? "Copied!" : "Copy"}
            </button>
            <button
              className="mt-2 bg-purple-500 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => {
                window.open(
                  `Hello! ${firstName} is invited to earn the rewards. ${encodeURIComponent(invitationLink)}`,
                  "_blank"
                );
              }}
            >
            <button
              className="bg-blue mb-2 hover:bg-yellow-light text-white text-sm font-bold p-2 rounded whitespace-nowrap"
                onClick={() => {
                  window.open(
                    `Hello! ${firstName} is invited to earn rewards. Click the link below to join: 
                https://t.me/share/url?url=${encodeURIComponent(invitationLink)}`, 
                    '_blank'
                  );
                }}              
            >
              Invite
            </button>
              <span className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 13l4-4m0 0l4 4m-4-4v12M4 3h16c1.104 0 2 .896 2 2v14c0 1.104-.896 2-2 2H4c-1.104 0-2-.896-2-2V5c0-1.104.896-2 2-2z"/>
                </svg>
                <span className="pl-2">Invite</span>
              </span>
            </button>
          </div>
        </div>

        {/* Referrals Section */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-xl max-h-96 overflow-y-auto">
          {referrals.length > 0 ? (
            referrals.map(({ balance, firstName, lastName, userImage }, idx) => (
              <div key={idx} className="flex items-center justify-between py-4 border-b border-gray-700">
                <div className="flex items-center">
                  <div className="mr-4 bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center">
                    <p>{idx + 1}</p>
                  </div>
                  <div className="flex items-center">
                    {userImage ? (
                      <img className="w-10 h-10 rounded-full" src={userImage} alt={firstName} />
                    ) : (
                      <div className="bg-gray-700 text-white w-10 h-10 rounded-full flex items-center justify-center">
                        <p>{firstName[0]}</p>
                      </div>
                    )}
                    <div className="ml-4">
                      <p className="font-semibold text-white">{firstName} {lastName}</p>
                      <p className="text-sm text-gray-400">${balance}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-white">You haven't invited any friends yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Referrals;
