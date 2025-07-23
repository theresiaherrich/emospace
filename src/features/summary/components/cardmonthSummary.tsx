import Card from "../../../components/ui/card";
import { getSummaryMood } from "../../../services/moodservice";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const CardSummary = () => {
    const isPremium = true;
    const [summary, setSummary] = useState("");
    
    useEffect(() => {
        const fetchSummary = async () => {
          try {
            const month = format(new Date(), "yyyy-MM");
            const data = await getSummaryMood(month);
            setSummary(data.summary);
          } catch (err) {
            console.error("Failed to fetch summary:", err);
          }
        };
    
        fetchSummary();
    }, [isPremium]);

    const monthName = new Date().toLocaleString("default", { month: "long" });

    return (
        <Card className="flex flex-col gap-2 w-full max-w-3xl h-fit py-7 px-12 mt-[40px] xl:mt-[70px] rounded-2xl bg-white bg-opacity-65">
            <div className="mb-10">
                <h1 className="font-bold text-xl font-spartan text-center">{monthName}'s Mood</h1>
            </div>
            <div className="flex flex-col justify-center py-2 px-3">
                    <p className="font-medium text-[#1C1C1C] text-justify leading-snug">{summary}</p>
            </div>
        </Card>
    );
};

export default CardSummary;