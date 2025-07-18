import React from "react";
import Button from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";

const AispaceContainer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-aispace bg-[center_top] bg-cover bg-no-repeat min-h-screen w-full relative overflow-hidden">
      <div className="flex flex-col items-center justify-center h-full min-h-screen px-4 md:px-10 lg:px-20 font-spartan text-center relative z-10">
        <h1 className="text-[28px] sm:text-[36px] lg:text-[40px] leading-tight font-bold mb-12">
          How’s Your <span className="text-[#633796]">Day?</span>
          <br />
          Our <span className="text-[#633796]">AISpace</span> Always On Your{" "}
          <span className="text-[#633796]">Side</span>
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-14">
          <div className="relative">
            <Button
              onClick={() => navigate("/")}
              className="text-white text-sm rounded-xl bg-[#FF8EC4] bg-opacity-75 hover:bg-[#FF8EC4] px-8 sm:px-9 py-3 border-2 border-[#FF8FCD]"
            >
              Mood Summary
            </Button>
            <img src="/assets/6.svg" alt="Mood Bot" className="absolute -bottom-8 -right-8 w-14 sm:w-16 h-14 sm:h-16"/>
          </div>

          <div className="relative">
            <Button
              onClick={() => navigate("/space-chat")}
              variant="primary"
              className="text-white text-sm rounded-xl bg-[#633796] bg-opacity-75 px-6 py-3 border-2 border-[#C19EDD]"
            >
              Let’s Meet AISpace
            </Button>
            <img src="/assets/3.svg" alt="Mood Bot" className="absolute -bottom-8 -right-8 w-14 sm:w-16 h-14 sm:h-16"/>
          </div>
        </div>
      </div>
      <img src="/assets/1.svg" alt="Space Icon" className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 w-[160px] sm:w-[200px] lg:w-[302px] h-auto z-0 hidden md:block"/>
    </div>
  );
};

export default AispaceContainer;
