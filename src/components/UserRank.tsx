const UserRank = () => {

    const user = {
        userImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        firstName: "Joni"
    }
    return (
        <div className=" flex items-center mx-4 mt-6">
            <div className="z-20">
                <div className="border-4 border-blue-700 flex item-center justify-center rounded-full bg-gray-800 w-14 h-14 overflow-hidden">
                    {
                        user.userImage ? (
                            <img
                                className="object-contain"
                                src={user.userImage}
                                alt={user.firstName.toUpperCase()}
                            />
                        ) : (
                            <div className="text-2xl text-white bg-black w-14 h-14 flex items-center justify-center">
                                {user.firstName.toUpperCase()}
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="-ml-3 w-full z-10">
                <p className="text-sm mb-1 tracking-wider text-white ml-6">
                    Your rank is 5
                    <span className="mx-4">{">"}</span>
                    5/1000
                </p>
                <div className="flex items-center border-2 border-[#43433b] rounded-r-full">
                    <div className="w-full h-3 bg-[#43433b]/[0.6] rounded-full"
                        style={{ width: `10%` }}
                    />

                </div>
            </div>
        </div>
    )
}

export default UserRank