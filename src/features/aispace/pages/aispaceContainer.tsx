import React from "react";
import Button from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";

const AispaceContainer: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-aispace bg-[center_top] bg-cover bg-no-repeat min-h-screen w-full">
            <div className="flex flex-col justify-center pt-[200px] px-4 md:px-10 lg:px-20 pb-[300px] font-spartan">
                <div className="flex flex-col items-center">
                    <h1 className="text-[40px] leading-tight font-bold mb-12 text-center">How’s Your 
                        <span className="text-[#633796]"> Day?</span> 
                        <br /> Our
                        <span className="text-[#633796]"> AISpace </span>
                        Always On Your
                        <span className="text-[#633796]"> Side</span>
                    </h1>
                    <div className="flex items-center justify-center gap-14">
                        <Button onClick={() => navigate("/")} className="text-white text-sm relative rounded-xl bg-[#FF8EC4] bg-opacity-75 hover:bg-[#FF8EC4] px-9 py-3 border-2 border-[#FF8FCD]">
                            Mood Summary
                            <img
                                src="/assets/6.svg"
                                alt="Mood Bot"
                                className="absolute bottom-[-30px] right-[-40px] w-16 h-16"
                            />
                        </Button>
                        <Button onClick={() => navigate("/space-chat")} variant="primary" className="text-white text-sm relative rounded-xl bg-[#633796] bg-opacity-75 px-6 py-3 border-2 border-[#C19EDD]">
                            Let’s Meet AISpace
                            <img
                                src="/assets/3.svg"
                                alt="Mood Bot"
                                className="absolute bottom-[-30px] right-[-40px] w-16 h-16"
                            />
                        </Button>
                    </div>
                </div>
                <img src="/assets/1.svg" alt="Space" className="w-[302px] h-[302px] absolute top-[50%] left-[5%]"/>
            </div>
        </div>
    );
};

export default AispaceContainer;