import Card from "../../../components/ui/card";
import { useEffect, useState } from "react";
import { getSummaryMood } from "../../../services/moodservice";
import { format } from "date-fns";
import { useUser } from "../../../context/usercontext";

const SummaryCard = () => {
    const { user } = useUser(); 
    const isPremium = user?.is_premium ?? false;
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

    return (
        <Card className="flex flex-col gap-2 w-full max-w-[452px] h-[491px] p-4 mt-[40px] xl:mt-[70px] rounded-2xl shadow-none bg-[#FDFEFF]">
            <div className="flex items-center gap-2 justify-between w-full">
                <div className="flex items-center gap-2">
                    <img className="h-6 w-6" src="/assets/crown 1.svg" alt="" />
                    <h1 className="text-xl font-bold text-left">Summary</h1>
                </div>
                  <a href={isPremium ? "/summary" : "/premium"} className="text-xs font-medium text-[#9F53FF]">View all</a>
            </div>
            {isPremium ? (
                <div className="flex flex-col items-center justify-center py-2 px-3">
                    <p className="font-medium text-[#1C1C1C] text-justify leading-snug break-words overflow-hidden text-ellipsis line-clamp-[10]" dangerouslySetInnerHTML={{ __html: summary }}/>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="font-medium text-[#1C1C1C] text-opacity-60 text-center">Unlock Premium to Access This Feature</p>
                    <a href="/premium" className="text-[#593187] font-medium text-opacity-60 text-center">Click Here to Upgrade With Rp 29.000 Only!</a>
                </div>
            )}
        </Card>
    )
}

export default SummaryCard