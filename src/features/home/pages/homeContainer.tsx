import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DateCard from "../components/dateCard";
import MoodCard from "../components/moodCard";
import MindToTellCard from "../components/mindtellCard";
import CalendarMood from "../components/moodCalendar";
import { type MoodType, type MoodMap, moodColors } from "../types/type";
import { formatInTimeZone } from "date-fns-tz";
import Card from "../../../components/ui/card";
import Button from "../../../components/ui/button";
import SummaryCard from "../components/summaryCard";
import { postMood, getMonthlyMood } from "../../../services/moodservice";
import { type JournalAPI } from "../../myjournal/types/type";
import { getJournal } from "../../../services/journalservice";

const isValidMood = (m: any): m is MoodType => Object.keys(moodColors).includes(m);

const HomeContainer: React.FC = () => {
  const [moodData, setMoodData] = useState<MoodMap>({});
  const navigate = useNavigate();
  const [journals, setJournals] = useState<JournalAPI[]>([]);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const res = await getJournal();
        const sorted = res
          .sort((a : JournalAPI, b : JournalAPI) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 3);
        setJournals(sorted);
      } catch (err) {
        console.error("Failed to fetch journals:", err);
      }
    };

    fetchJournals();
  }, []);

  useEffect(() => {
    const fetchMoods = async () => {
      const month = formatInTimeZone(new Date(), 'Asia/Jakarta', 'yyyy-MM');
      try {
        const res = await getMonthlyMood(month);
        const moodMap: MoodMap = {};

        for (const item of res) {
          const { date, mood_code } = item;
          if (date && isValidMood(mood_code)) {
            moodMap[date] = {
              mood_code,
              color: moodColors[mood_code],
            };
          }
        }

        setMoodData(moodMap);
      } catch (err) {
        console.error("Failed to fetch moods:", err);
      }
    };

    fetchMoods();
  }, []);

  const handleMoodSelect = async (mood_code: MoodType) => {
    const date = formatInTimeZone(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd');
    const color = moodColors[mood_code];
    try {
      await postMood({ mood_code });
      setMoodData((prev) => ({
        ...prev,
        [date]: { mood_code, color },
      }));
    } catch (err) {
      console.error("Failed to post mood:", err);
    }
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";
    return "Good Night";
  };

  return (
    <div className="bg-home bg-[center_top] bg-cover bg-no-repeat min-h-screen w-full">
      <div className="flex justify-center pt-[120px] px-4 md:px-10 lg:px-20 pb-20">
        <div className="flex flex-col gap-16 font-spartan mx-auto w-full max-w-screen-xl">
          <div className="flex flex-col items-center justify-center w-full">
            <img
              src="/assets/bintang.svg"
              alt=""
              className="absolute top-[90px] left-[10%] sm:left-[10%] md:left-[25%] lg:left-[440px]"
            />
            <h1 className="text-[26px] sm:text-[28px] md:text-[32px] leading-tight font-bold text-black mb-4 text-center">
              {greeting()} User, <br /> How Are You Feeling Today?
            </h1>
            <div className="flex flex-col xl:flex-row gap-9 justify-center items-center w-full">
              <DateCard imageSrc="/assets/rectangle.png" />
              <MoodCard onSelectMood={handleMoodSelect} />
              <MindToTellCard />
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-4 text-left">
              Here Is Your Mood Tracker
            </h1>
            <div className="flex flex-col xl:flex-row gap-6 items-center justify-center w-full">
              <CalendarMood moodData={moodData} />
              <SummaryCard />
            </div>
          </div>

          <div className="flex flex-col-reverse xl:flex-row gap-10 justify-center w-full">
            <div className="flex flex-col xl:flex-row gap-8 items-center justify-center">
              {journals.map((journal, idx) => (
                <Card
                  key={journal.id}
                  className="flex flex-col gap-5 pt-10 pb-9 px-6 items-center rounded-[150px] h-[510px] w-full max-w-[234px] shadow-[5px_5px_20px_0px_#00000040]"
                  style={{ backgroundColor: ["#E7DCF0", "#E2D2EF", "#DCCBEB"][idx % 3] }}
                >
                  <img src="/assets/bintang-ungu.svg" alt="" className="h-10 w-10" />
                  <div className="flex flex-col items-center">
                    <h1 className="text-xl text-center font-bold line-clamp-2">{journal.title}</h1>
                    <p className="text-sm font-semibold text-[#969696]">
                      {new Date(journal.date).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  <div className="text-sm md:text-base/5 font-medium text-center font-spartan text-[#1C1C1C] text-opacity-80 line-clamp-[8]">
                    {journal.content}
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex flex-col gap-6 justify-center items-center w-full xl:max-w-xs">
              <img src="/assets/logo-journal.svg" alt="" className="w-40" />
              <Button
                className="text-base md:text-xl font-semibold font-spartan bg-[#DCC5ED] rounded-[150px] border-2 border-[#341A554D] w-full py-4 hover:bg-[#d1b2ea]"
                onClick={() => navigate("/my-journal/detail/new")}
              >
                Add New Journal
              </Button>
              <Button
                variant="primary"
                className="text-base md:text-xl font-semibold font-spartan rounded-[150px] border-2 border-[#341A55] w-full py-4 hover:bg-[#3c2c48]"
                onClick={() => navigate("/my-journal")}
              >
                View All Journal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
