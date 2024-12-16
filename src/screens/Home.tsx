import Liders from "@/components/Liders"
import Premium from "@/components/Premium"
import Profile from "@/components/Profile"

const Home = () => {
    return (
        <section className="flex bg-gray-800 flex-col h-screen relative">
            <div>
                <Profile />
                <Premium />
                <Liders />
            </div>
        </section>
    )
}

export default Home