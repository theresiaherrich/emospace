import {
  XIcon,
  Bell,
  UserCheck2,
  MessageSquareQuote,
  LockKeyhole,
  SquareGanttChart,
  Languages,
} from "lucide-react";
import MenuItem from "../components/menuitem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface UserProfileCardProps {
  name: string;
  email: string;
  phone: string;
  isPremium: boolean;
}

const UserProfileCard = ({ name, email, phone, isPremium }: UserProfileCardProps) => {
  const navigate = useNavigate();

  const [notificationsOn, setNotificationsOn] = useState(false);
  const [language, setLanguage] = useState<"English" | "Bahasa">("English");
  const [premium] = useState(isPremium);

  const handleToggleNotifications = () => {
    setNotificationsOn((prev) => !prev);
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === "English" ? "Bahasa" : "English"));
  };

  const handlePremiumClick = () => {
    if (!premium) {
      navigate("/premium");
    }
  };

  return (
    <div className="rounded-[30px] overflow-hidden bg-[#E9DDF4] shadow-lg relative font-spartan w-full max-w-2xl mx-auto">
      <button className="absolute top-4 left-4 text-white z-10" onClick={() => navigate("/")}>
        <XIcon className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      <div className="relative">
        <div className="h-40 rounded-t-3xl relative z-0">
          <div className="bg-[#593187] h-24"></div>
          <img src="/assets/Rectangle 51.svg" alt="" className="absolute bottom-0 left-0 w-full" />
        </div>

        <div className="relative z-10 -mt-20 flex flex-col items-center">
          <img src="/assets/photo-profil.svg" alt="user" className="w-24 h-24 sm:w-28 sm:h-28 bg-[#E9DDF4] rounded-full" />
          {premium && (
            <img src="/assets/crown-prem.svg" alt="Premium" className="absolute -top-6 right-[33%] sm:right-[38%] w-10 h-10 sm:w-12 sm:h-12" />
          )}
        </div>
      </div>

      <div className="text-center mt-4 px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold">{name}</h2>
        <p className="text-sm text-[#333] break-words">{email} | {phone}</p>
      </div>

      <div className="px-4 pb-8 pt-5 flex flex-col gap-4">
        <div className="flex flex-col gap-2 py-3 px-5 sm:px-7 bg-[#593187] rounded-lg w-[250px] md:w-[450px] mx-auto">
          <MenuItem label="Edit profile information" onClick={() => navigate("/user-profile/edit")}>
            <SquareGanttChart className="text-white h-4 w-4" />
          </MenuItem>
          <MenuItem label="Notifications" value={notificationsOn ? "ON" : "OFF"} onClick={handleToggleNotifications}>
            <Bell className="text-white h-4 w-4" />
          </MenuItem>
          <MenuItem label="Language" value={language} onClick={handleToggleLanguage}>
            <Languages className="text-white h-4 w-4" />
          </MenuItem>
        </div>

        <div className="flex flex-col gap-2 py-3 px-5 sm:px-7 bg-[#593187] rounded-lg w-[250px] md:w-[450px] mx-auto">
          <MenuItem label="Premium" value={premium ? "ON" : "OFF"} onClick={handlePremiumClick}>
            <UserCheck2 className="text-white h-4 w-4" />
          </MenuItem>
          <MenuItem label="Contact Us" onClick={() => {}}>
            <MessageSquareQuote className="text-white h-4 w-4" />
          </MenuItem>
          <MenuItem label="Privacy Policy" onClick={() => {}}>
            <LockKeyhole className="text-white h-4 w-4" />
          </MenuItem>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;