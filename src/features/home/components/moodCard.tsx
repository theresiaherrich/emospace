import { useState } from 'react';
import Card from '../../../components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type MoodType } from '../types/type';

const moods: { mood_code: MoodType; emoji: string }[] = [
  { mood_code: 'Sad', emoji: '/assets/sad.svg' },
  { mood_code: 'Spectacular', emoji: '/assets/spectacular.svg' },
  { mood_code: 'Angry', emoji: '/assets/angry.svg' },
  { mood_code: 'Calm', emoji: '/assets/calm.svg' },
  { mood_code: 'Happy', emoji: '/assets/happy.svg' },
  { mood_code: 'Upset', emoji: '/assets/upset.svg' },
];

interface MoodCardProps {
  onSelectMood: (moods: MoodType) => void;
}

const MoodCard: React.FC<MoodCardProps> = ({ onSelectMood }) => {
  const [index, setIndex] = useState(0);

  const prevIndex = (index - 1 + moods.length) % moods.length;
  const nextIndex = (index + 1) % moods.length;

  const handlePrev = () => setIndex(prevIndex);
  const handleNext = () => setIndex(nextIndex);

  const handleSelect = () => {
    const selectedMood = moods[index].mood_code;
    onSelectMood(selectedMood);
  };

  return (
    <Card className="text-center h-full w-[340px] lg:w-[400px] bg-[#FDFEFF]">
      <h3 className="text-2xl font-bold mb-4 text-left">Today I Feel...</h3>
      <div className="flex items-center justify-center gap-2 lg:gap-3 font-medium font-spartan">
        <button onClick={handlePrev} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1">
          <div className="flex flex-col items-center scale-80">
            <div className="w-16 h-16 lg:w-20 lg:h-20">
              <img src={moods[prevIndex].emoji} alt={moods[prevIndex].mood_code} className="w-16 h-16 lg:w-20 lg:h-20" />
            </div>
            <div className="text-sm lg:text-base mt-1">{moods[prevIndex].mood_code}</div>
          </div>

          <div
            onClick={handleSelect}
            className="flex flex-col items-center scale-110 cursor-pointer"
          >
            <div className="w-24 h-24 lg:w-28 lg:h-28">
              <img src={moods[index].emoji} alt={moods[index].mood_code} className="w-24 h-24 lg:w-28 lg:h-28" />
            </div>
            <div className="text-lg lg:text-xl mt-1">{moods[index].mood_code}</div>
          </div>

          <div className="flex flex-col items-center scale-80">
            <div className="w-16 h-16 lg:w-20 lg:h-20">
              <img src={moods[nextIndex].emoji} alt={moods[nextIndex].mood_code} className="w-16 h-16 lg:w-20 lg:h-20" />
            </div>
            <div className="text-sm lg:text-base mt-1">{moods[nextIndex].mood_code}</div>
          </div>
        </div>

        <button onClick={handleNext} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </Card>
  );
};

export default MoodCard;
