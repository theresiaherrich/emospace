import { PlusSquareIcon } from "lucide-react";

const SideBar = () => {
    return (
        <aside className="bg-[#E9DDF4] w-[280px] h-screen px-[72px] py-11">
            <div className="flex flex-col">
                <div className="flex flex-col gap-12 text-[#666666] font-spartan">
                    <div className="flex gap-5 items-center mt-6 justify-start">
                        <PlusSquareIcon className="w-6 h-6" />
                        <h1 className="font-medium text-xl">New Chat</h1>
                    </div>
                    <div className="flex flex-col gap-6 justify-start">
                        <h1 className="font-medium text-xl">Recent</h1>
                        <div className="flex flex-col gap-4">
                            <h1>April 11, 2025</h1>
                            <h1>April 10, 2025</h1>
                            <h1>April 9, 2025</h1>
                        </div>
                    </div>
                </div>
                <img src="/assets/logo.svg" alt="" className="absolute bottom-4 w-28 h-28"/>
            </div>
        </aside>
    )
}

export default SideBar;