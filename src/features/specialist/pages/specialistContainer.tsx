import SearchBar from "../../../components/ui/searchbar";
import CardSpecialist from "../components/card";
import { useState, useEffect } from "react";
import { dataSpecialists } from "../types/type";
import type { dataSpecialist } from "../types/type";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../components/ui/confirmModal";

const SpecialistContainer: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState(dataSpecialists);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSpecialist, setSelectedSpecialist] = useState<dataSpecialist | null>(null);
    const navigate = useNavigate();

    const handleClick = (specialist: dataSpecialist) => {
        setSelectedSpecialist(specialist);
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        if (selectedSpecialist) {
            navigate("/payment", {
            state: {
                paymentType: "consultation",
                price: selectedSpecialist.price,
            },
            });
        }
    };

    useEffect(() => {
        const filtered = dataSpecialists
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
        <div className="bg-[#F3F3F3] bg-cover bg-no-repeat min-h-screen w-full relative overflow-hidden">
            <img src="/assets/gradient-purple.svg" alt="" className="absolute top-[-250px] left-10"/>
            <img src="/assets/cloud.svg" alt="" className="absolute top-20 left-1/2 transform -translate-x-1/2 w-40 sm:w-56 md:w-72"/>
            <div className="pt-32 sm:pt-40 flex flex-col min-h-screen relative z-10 px-4 sm:px-8">
                <div className="mb-6 relative text-center">
                    <img src="/assets/bintang-1.svg" alt="" className="absolute top-[-20px] left-1/4 w-5 sm:w-6"/>
                    <h1 className="font-spartan text-2xl sm:text-3xl font-bold text-[#1C1C1C]">
                        Here is Our Top Specialist
                    </h1>
                    <img src="/assets/bintang-1.svg" alt="" className="absolute top-2 right-1/4 w-4 sm:w-5"
                    />
                </div>
                <div className="flex justify-center mx-auto">
                    <div className="w-full justify-center">
                        <SearchBar
                            onSearch={setSearchQuery}
                            placeholder="Search by Expertise, Symptomps, Rating, etc"
                            className=""
                        />
                    </div>
                </div>
                <div className="flex justify-center flex-wrap gap-4 sm:gap-x-5 sm:gap-y-6 mt-10 mb-6">
                    {filteredData.map((item) => (
                        <CardSpecialist
                            key={item.id}
                            name={item.name}
                            photo={item.photo}
                            job={item.job}
                            expertise={item.expertise}
                            experience={item.experience}
                            rating={item.rating}
                            price={item.price}
                            onClick={() => handleClick(item)}
                        />
                    ))}
                </div>
            </div>

            {isModalOpen && selectedSpecialist && (
                <ConfirmModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirm}
                    amount={selectedSpecialist.price}
                />
            )}
        </div>
    );
}

export default SpecialistContainer;