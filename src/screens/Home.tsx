import Liders from "@/components/Liders"
import Premium from "@/components/Premium"
import Profile from "@/components/Profile"

const Home = () => {
    return ( 
        <section className="flex flex-col bg-gray-deep h-screen relative">
            <div>
                <Profile />
                <Premium />
                <Liders />
            </div>
        </section>
    )
}

export default Home