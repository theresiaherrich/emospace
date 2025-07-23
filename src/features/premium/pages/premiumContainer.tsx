import { useEffect, useState } from 'react';
import { type APIPremiumPlan, type PremiumDetails } from '../types/type';
import { mapPlansToPremiumDetails } from '../../../utils/premium';
import PremiumCard from '../components/premiumcard';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../../components/ui/confirmModal';

const PremiumContainer = () => {
    const [premiumPlans, setPremiumPlans] = useState<PremiumDetails[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPremium, setSelectedPremium] = useState<PremiumDetails | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await fetch('/api/plans');
                const data: APIPremiumPlan[] = await res.json();
                const mapped = mapPlansToPremiumDetails(data);
                setPremiumPlans(mapped);
            } catch (error) {
                console.error('Failed to fetch premium plans:', error);
            }
        };

        fetchPlans();
    }, []);

    const handleUpgradeClick = (item: PremiumDetails) => {
        setSelectedPremium(item);
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        if (selectedPremium) {
            navigate('/payment', { 
                state: { 
                    paymentType: 'premium', 
                    premiumType: selectedPremium.premiumType, 
                    period: selectedPremium.period,
                    price: selectedPremium.price
                }
            });
        }
    };

    return (
        <div className="bg-[#F3F3F3] bg-cover min-h-screen w-full relative overflow-hidden">
            <img src="/assets/gradient-purple.svg" alt="" className="absolute -top-60 left-10 w-[500px] sm:w-[600px]" />
            <img src="/assets/gradient-pink-oval.svg" alt="" className="absolute -top-96 right-0 w-72 sm:w-96" />
            <img src="/assets/gradient-pink-oval-left.svg" alt="" className="absolute -top-96 left-0 w-72 sm:w-96" />
            <img src="/assets/gradient-purple.svg" alt="" className="absolute bottom-0 right-0 w-[300px] sm:w-[400px]" />
            <img src="/assets/cloud.svg" alt="" className="absolute top-[86px] left-1/2 transform -translate-x-1/2 w-52 sm:w-72" />

            <div className="pt-32 sm:pt-40 px-6 sm:px-12 md:px-20 pb-20 flex flex-col min-h-screen relative z-10">
                <div className="mb-10 gap-3 flex flex-col text-center relative">
                    <img src="/assets/bintang-1.svg" alt="" className="absolute top-[-20px] left-1/4 w-6" />
                    <h1 className="font-spartan text-2xl sm:text-3xl md:text-[32px] font-extrabold text-[#1C1C1C]">
                    Upgrade to EmoSpace Premium
                    </h1>
                    <p className="font-spartan text-base sm:text-lg md:text-xl font-medium text-[#351A57]">
                    More features, more peace of mind.
                    </p>
                    <img src="/assets/bintang-1.svg" alt="" className="absolute top-2 right-1/4 w-5" />
                </div>

                <div className="flex flex-col lg:flex-row gap-8 md:gap-12 mb-12 items-center justify-center">
                    {premiumPlans.map((item) => (
                        <PremiumCard
                            key={item.id}
                            variant={item.id % 2 === 0 ? "primary" : "secondary"}
                            premiumType={item.premiumType}
                            value={item.value}
                            price={item.price}
                            period={item.period}
                            description={item.description}
                            onClick={() => handleUpgradeClick(item)}
                        />
                    ))}
                </div>

                <div className="flex flex-col items-center">
                    <ul className="flex flex-col gap-2 text-center list-disc list-inside">
                    <li className="font-spartan text-base sm:text-lg md:text-xl">
                        Full Access to AI Chat Support (AISpace)
                    </li>
                    <li className="font-spartan text-base sm:text-lg md:text-xl">
                        Unlimited AI Emotional Summaries
                    </li>
                    </ul>
                </div>

                <div className="flex justify-center mt-9">
                    <p className="font-spartan text-lg sm:text-2xl md:text-3xl font-medium text-white bg-[#210068] py-3 px-6 sm:px-9 rounded-full shadow-md w-fit text-center">
                    Choose Your Premium Plan
                    </p>
                </div>
            </div>

            {isModalOpen && selectedPremium && (
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
                amount={
                selectedPremium.price
                    ? parseInt(selectedPremium.price.replace(/[^0-9]/g, ""))
                    : 0
                }
            />
            )}
        </div>
    );
}

export default PremiumContainer;