import Card from '../../../components/ui/card';
import { useNavigate } from 'react-router-dom';

const MindToTellCard: React.FC = () => {
    const navigate = useNavigate();

    return (
    <Card className="text-center bg-[#FDFEFF] px-8">
        <h3 className="text-2xl font-bold mb-4 text-left">Mind To Tell?</h3>
        <div className="flex items-center justify-center gap-8 text-base font-medium font-spartan">
            <button onClick={() => navigate("/aispace")} className="flex flex-col items-center">
                <img src="/assets/1.svg" alt="Talk to space" className="h-32" />
                <span>Talk To Space</span>
            </button>
            <button onClick={() => navigate("/specialist")} className="flex flex-col items-center">
                <img src="/assets/specialist-icon.png" alt="Seek Expert" className="h-32" />
                <span>Seek Expert</span>
            </button>
        </div>
    </Card>
)};

export default MindToTellCard;