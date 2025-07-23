import Card from "../../../components/ui/card";

const DateCard = ({ imageSrc }: { imageSrc: string }) => {
  const now = new Date();

  const formattedDate = now.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const time = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card className="max-w-sm bg-[#FDFEFF] h-full min-w-fit">
      <img src={imageSrc} alt="Mood image" className="rounded-xl w-[287px] h-40" />
      <div className="flex justify-between items-center mt-4 font-semibold text-lg">
        <p>{formattedDate}</p>
        <span>{time}</span>
      </div>
    </Card>
  );
};

export default DateCard;