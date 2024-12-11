import CryptoAnalyzer from "@/components/CryptoAnalyzer"
import Liders from "@/components/Liders"
import UserRank from "@/components/UserRank"

const Home = () => {
    return (
        <div className="flex flex-col h-screen relative">
            <div>
                <UserRank />
                <CryptoAnalyzer />
                <Liders />
            </div>
        </div>
    )
}

export default Home