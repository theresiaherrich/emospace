import CardSummary from "../components/cardmonthSummary";

const SummaryContainer = () => {
    const monthName = new Date().toLocaleString("default", { month: "long" });

    return (
        <div className="bg-home bg-cover bg-no-repeat min-h-screen w-full overflow-x-hidden">
            <div className="pt-40 px-8 sm:px-10 md:px-20 pb-12 flex flex-col min-h-screen relative z-10">
                <div className="mb-6 relative text-center">
                    <img src="/assets/bintang-1.svg" alt="" className="absolute top-[-70%] left-[37%] transform -translate-x-[150%] w-6 sm:w-8" />
                    <h1 className="font-spartan text-2xl sm:text-3xl font-bold text-[#1C1C1C]">
                        {monthName}'s Mood<span className="text-[#633796]"> Summary</span>
                    </h1>
                    <img src="/assets/bintang-1.svg" alt="" className="absolute bottom-[-65%] right-[36%] transform translate-x-[150%] w-5 sm:w-6"/>
                </div>
                <div className="flex justify-center">
                    <CardSummary />
                </div>
            </div>
        </div>
    );
};

export default SummaryContainer;