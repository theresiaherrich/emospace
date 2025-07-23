import Card from "../../../components/ui/card";
import { Briefcase, ThumbsUp } from "lucide-react";
import Button from "../../../components/ui/button";

interface CardProps {
    name: string;
    photo: string;
    job: string;
    expertise: string;
    experience: string;
    rating: string;
    price: number;
    onClick: () => void;
}

const CardSpecialist: React.FC<CardProps> = ({ name, photo, job, expertise, experience, rating, price, onClick  }) => {

    return (
        <Card className="bg-[#E9DDF4] border border-[#666666] max-w-[360px] lg:w-[360px]">
            <div className="flex gap-3">
                <img src={photo} alt="Specialist Photo" className="w-20 h-24 rounded-xl object-cover"/>
                <div className="font-spartan">
                    <h3 className="text-[#1C1C1C] font-bold text-left leading-5">{name}</h3>
                    <p className="text-opacity-60 text-[#1C1C1C] text-sm font-medium text-left">{job}</p>
                    <p className="text-opacity-60 text-[#1C1C1C] text-sm font-medium text-left mt-3">{expertise}</p>
                    <div className="flex gap-2">
                        <label htmlFor="" className="opacity-50 rounded-md border border-[#666666] text-[10px] text-[#666666] px-2 py-1 flex gap-1">
                            <Briefcase className="w-3 h-3 text-[#666666]"/>
                            {experience}
                        </label>
                        <label htmlFor="" className="opacity-50 rounded-md border border-[#666666] text-[10px] text-[#666666] px-2 py-1 flex gap-1">
                            <ThumbsUp className="w-3 h-3 text-[#666666]"/>
                            {rating}
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-2 items-center">
                <h1 className="font-spartan text-opacity-60 text-sm font-bold text-[#593187]">Rp {price.toLocaleString('id-ID')}</h1>
                <Button variant="primary" className="text-xs font-semibold bg-[#593187] rounded-md py-1 px-6 opacity-65 backdrop-blur-sm" onClick={onClick}>
                    Chat
                </Button>
            </div>
        </Card>
    );
};

export default CardSpecialist