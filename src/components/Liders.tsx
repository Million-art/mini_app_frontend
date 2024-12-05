
const Liders = () => {
    const topUsers = [
        {
            id: 1,
            balance: 1250.75,
            firstName: "John",
            lastName: "Doe",
            userImage: "https://source.unsplash.com/random/200x200/?face,portrait",
        },
        {
            id: 2,
            balance: 890.4,
            firstName: "Jane",
            lastName: "Smith",
            userImage: "https://source.unsplash.com/random/200x200/?face,female",
        },
        {
            id: 3,
            balance: 2045.32,
            firstName: "Chris",
            lastName: "Brown",
            userImage: "https://source.unsplash.com/random/200x200/?face,male",
        },
        {
            id: 4,
            balance: 305.67,
            firstName: "Emily",
            lastName: "Johnson",
            userImage: "https://source.unsplash.com/random/200x200/?portrait,woman",
        },
        {
            id: 5,
            balance: 1520.0,
            firstName: "Michael",
            lastName: "Williams",
            userImage: "https://source.unsplash.com/random/200x200/?portrait,man",
        },
    ];
    const user = {
        uid: 5,
    }
    return (
        <div className="bg-gray-800 mx-4 mt-6 mb-24 h-60 rounded-lg relative">
            <div className="h-full overflow-y-auto hide-scrollbar pb-12">
                {
                    topUsers.map(
                        ({ id, balance, firstName, lastName, userImage }, idx) => (
                            <div
                                key={idx}
                                className={`${id === user.uid && "bg-gray-900"} flex items-center px-2 py-1 w-full`}
                            >
                                <div className="flex-shrink-0 mr-4">
                                    <div className="bg-zinc-950 flex items-center justify-center rounded-full h-8 w-8">
                                        <p className="text-white text-sm">{idx + 1} </p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 mr-2">
                                    <div className="border-2 border-yellow-700 overflow-hidden flex items-center justify-center rounded-full bg-gray-800 h-10 w-10">
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
                                    <p className="text-white font-bold truncate mr-2"> {firstName} {lastName} </p>
                                    <p className="text-white whitespace-nowrap flex-shrink-0">$ {balance} </p>
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default Liders