import Liders from "@/components/Liders"
import UserRank from "@/components/UserRank"

const Home = () => {
    return (
        <div className="flex flex-col h-screen relative">
            <div>
                <UserRank />
            </div>
            <div>
                <Liders />
            </div>
        </div>
    )
}

export default Home