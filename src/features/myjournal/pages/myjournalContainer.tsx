import Button from "../../../components/ui/button";
import { useState, useEffect } from "react";
import CardList from "../components/cardlist";
import { Journal } from "../types/type";
import { CalendarSelect} from "../../../components/ui/calendar";
import { useNavigate } from "react-router-dom";

const MyJournalContainer = () => {
    const [activeFilter, setActiveFilter] = useState<"All" | "Month" | "Year">("All");
    const [filteredJournals, setFilteredJournals] = useState(Journal);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [selectedYear, setSelectedYear] = useState(new Date());
    const navigate = useNavigate();

    const handleFilterClick = (filter: "All" | "Month" | "Year") => {
        setActiveFilter(filter);

        if (filter === "All") {
            const sorted = [...Journal].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            setFilteredJournals(sorted);
        }
    };

    useEffect(() => {
        if (activeFilter === "Month") {
            const filtered = Journal.filter((journal) => {
            const parsedDate = new Date(journal.date);
            return (
                parsedDate.getMonth() === selectedMonth.getMonth() &&
                parsedDate.getFullYear() === selectedMonth.getFullYear()
            );
            });

            const sorted = filtered.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
            });

            setFilteredJournals(sorted);
        }
    }, [selectedMonth, activeFilter]);

    useEffect(() => {
        if (activeFilter === "Year") {
            const filtered = Journal.filter((journal) => {
            const parsedDate = new Date(journal.date);
            return parsedDate.getFullYear() === selectedYear.getFullYear();
            });

            const sorted = filtered.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
            });

            setFilteredJournals(sorted);
        }
    }, [selectedYear, activeFilter]);


    return (
        <div className="bg-[#F3F3F3] bg-cover bg-no-repeat min-h-screen w-full">
            <img src="/assets/gradient-purple.svg" alt="" className="-top-60 left-24 absolute"/>
            <img src="/assets/cloud.svg" alt="" className="top-[86px] left-[497px] w-72 absolute "/>
            <div className="pt-40 px-20 pb-7 flex flex-col min-h-screen relative z-10">
                <div className="mb-6">
                    <img src="/assets/bintang-1.svg" alt="" className="absolute top-[135px] left-[440px] w-8"/>
                    <h1 className="font-spartan text-3xl font-bold text-[#1C1C1C] text-center justify-center">
                        Check Your Past<span className="text-[#633796]"> Journal</span>
                    </h1>
                    <img src="/assets/bintang-1.svg" alt="" className="absolute top-[180px] right-[455px] w-5"/>
                </div>
                <div className="flex flex-col gap-5 py-2">
                    <div className="flex gap-2 py-2">
                        <Button variant="label" onClick={() => handleFilterClick("All")} active={activeFilter === "All"}>All</Button>
                        <Button variant="label" onClick={() => handleFilterClick("Month")} active={activeFilter === "Month"}>Month</Button>
                        <Button variant="label" onClick={() => handleFilterClick("Year")} active={activeFilter === "Year"}>Year</Button>
                    </div>
                    <div className="flex justify-end relative -top-8">
                        {activeFilter === "Month" && (
                            <CalendarSelect
                            value={selectedMonth}
                            onChange={setSelectedMonth}
                            mode="month"
                            />
                        )}
                        {activeFilter === "Year" && (
                            <CalendarSelect
                            value={selectedYear}
                            onChange={setSelectedYear}
                            mode="year"
                            />
                        )}
                    </div>
                    <CardList variant="add" title="Add Your New Journal" onClick={() => navigate("/my-journal/detail/new")}/>
                    {filteredJournals.map((journal) => (
                        <CardList key={journal.id} variant="read" title={journal.title} date={journal.date} onClick={() => navigate(`/my-journal/detail/${journal.id}`)}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyJournalContainer