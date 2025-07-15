import SearchBar from "../../../components/ui/searchbar";
import CardSpecialist from "../components/card";
import { useState, useEffect } from "react";
import { dataSpecialist } from "../types/type";

const SpecialistContainer: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState(dataSpecialist);

    useEffect(() => {
        const filtered = dataSpecialist
        .filter((item) =>
            `${item.name} ${item.job} ${item.expertise} ${item.experience} ${item.rating}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            const ratingA = parseFloat(a.rating.replace("%", ""));
            const ratingB = parseFloat(b.rating.replace("%", ""));
            const expA = parseFloat(a.experience.replace(/[^\d]/g, ""));
            const expB = parseFloat(b.experience.replace(/[^\d]/g, ""));

            if (ratingA !== ratingB) return ratingB - ratingA;
            return expB - expA;
        });
        setFilteredData(filtered);
    }, [searchQuery]);

    return (
        <div className="bg-[#F3F3F3] bg-cover bg-no-repeat min-h-screen w-full">
            <img src="/assets/gradient-purple.svg" alt="" className="-top-60 left-24 absolute"/>
            <img src="/assets/cloud.svg" alt="" className="top-[86px] left-[497px] w-72 absolute "/>
            <div className="pt-40 flex flex-col min-h-screen relative z-10">
                <div className="mb-6">
                    <img src="/assets/bintang-1.svg" alt="" className="absolute top-[132px] left-[428px] w-8"/>
                    <h1 className="font-spartan text-3xl font-bold text-[#1C1C1C] text-center justify-center">
                        Here is Our Top Specialist
                    </h1>
                    <img src="/assets/bintang-1.svg" alt="" className="absolute top-[180px] right-[440px] w-5"/>
                </div>
                <div className="justify-center flex">
                    <SearchBar onSearch={setSearchQuery} placeholder="Search by Expertise, Symtomps, Rating, etc"/>
                </div>
                <div className="flex justify-center flex-wrap gap-x-5 gap-y-6 mt-14 mb-6">
                    {filteredData.map((item) => (
                        <CardSpecialist
                            key={item.id}
                            name={item.name}
                            photo={item.photo}
                            job={item.job}
                            expertise={item.expertise}
                            experience={item.experience}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SpecialistContainer;