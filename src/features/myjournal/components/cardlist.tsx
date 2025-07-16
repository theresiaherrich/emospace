import { ChevronRight, PlusIcon } from "lucide-react";

interface CardListProps {
    variant: 'add' | 'read';
    title: string;
    date?: string;
    onClick?: () => void
}

const CardList : React.FC<CardListProps> = ({ variant, title, date, onClick }) => {
    return (
        <div className="bg-[#E9DDF4] border border-[#666666] shadow-[5px_5px_10px_0px_#00000040] rounded-2xl flex justify-between items-center py-4 px-8 w-full cursor-pointer" onClick={onClick}>
            <div className="justify-start flex flex-col gap-2">
                <h1 className="font-semibold text-xl font-spartan text-left">{title}</h1>
                {variant === 'read' && <p className="font-spartan font-medium text-opacity-60 text-[#1C1C1C]">{date}</p>}
            </div>
            <button className="justify-end items-center">
                {variant === 'add' && <PlusIcon className="w-6 h-6 text-[#323232]" />}
                {variant === 'read' && <ChevronRight className="w-6 h-6 text-[#323232]" />}
            </button>
        </div>
    );
};

export default CardList;