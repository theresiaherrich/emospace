import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DateCard from "../components/dateCard";
import MoodCard from "../components/moodCard";
import MindToTellCard from "../components/mindtellCard";
import CalendarMood from "../components/moodCalendar";
import { type MoodType, type MoodMap } from "../types/type";
import { format } from "date-fns";
import Card from "../../../components/ui/card";
import Button from "../../../components/ui/button";

const HomeContainer: React.FC = () => {
  const [moodData, setMoodData] = useState<MoodMap>({});
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("moodData");
    if (stored) setMoodData(JSON.parse(stored));
  }, []);

  const handleMoodSelect = (mood: MoodType) => {
    const today = format(new Date(), "yyyy-MM-dd");
    const updated = { ...moodData, [today]: mood };
    setMoodData(updated);
    localStorage.setItem("moodData", JSON.stringify(updated));
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
              Good Morning User, <br /> How Are You Feeling Today?
            </h1>
            <div className="flex flex-col lg:flex-row gap-9 justify-center items-center w-full">
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
              <Card className="flex flex-col gap-2 w-full max-w-[452px] h-[491px] p-4 mt-[40px] xl:mt-[70px] rounded-2xl shadow-none bg-[#FDFEFF]">
                <div className="flex items-center gap-2 justify-between w-full">
                  <div className="flex items-center gap-2">
                    <img className="h-6 w-6" src="/assets/crown 1.svg" alt="" />
                    <h1 className="text-xl font-bold text-left">Summary</h1>
                  </div>
                  <a href="#" className="text-xs font-medium text-[#9F53FF]">View all</a>
                </div>
                <div className="flex items-center justify-center text-base font-medium text-[#1C1C1C] text-opacity-60 text-center">
                  Unlock Premium to Access This Feature
                </div>
              </Card>
            </div>
          </div>

          <div className="flex flex-col-reverse xl:flex-row gap-10 justify-center w-full">
            <div className="flex flex-col xl:flex-row gap-8 items-center justify-center">
              {["#E7DCF0", "#E2D2EF", "#DCCBEB"].map((color, idx) => (
                <Card
                  key={idx}
                  className={`flex flex-col gap-5 pt-10 pb-9 px-6 items-center rounded-[150px] h-[510px] w-full max-w-[234px] shadow-[5px_5px_20px_0px_#00000040]`}
                  style={{ backgroundColor: color }}
                >
                  <img src="/assets/bintang-ungu.svg" alt="" className="h-10 w-10" />
                  <div className="flex flex-col items-center">
                    <h1 className="text-xl text-center font-bold">
                      Malam Minggu dan Tumpukan Tugas
                    </h1>
                    <p className="text-sm font-semibold text-[#969696]">28/06/2025</p>
                  </div>
                  <div className="text-sm md:text-base/5 font-medium text-center font-spartan text-[#1C1C1C] text-opacity-80">
                    Sabtu malam di Malang, tapi aku lagi di kosan, bukan di kafe. Deadline tugas Makroekonomi udah mepet banget, rasanya kepala mau pecah. Materi kuliah numpuk, harus nyari jurnal juga, bikin mata perih. <br /><br />Tadi sempat bikin kopi instan dingin biar melek tapi malah kembung...
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex flex-col gap-6 justify-center items-center w-full xl:max-w-xs">
              <img src="/assets/logo-journal.svg" alt="" className="w-40" />
              <Button
                className="text-base md:text-xl font-semibold font-spartan bg-[#DCC5ED] rounded-[150px] border-2 border-[#341A554D] w-full py-4 hover:bg-[#d1b2ea]"
                onClick={() => navigate("/journal")}
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
