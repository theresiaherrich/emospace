import {
  XIcon,
  Bell,
  UserCheck2,
  MessageSquareQuote,
  LockKeyhole,
  SquareGanttChart,
  Languages,
  LogOut
} from "lucide-react";
import MenuItem from "../components/menuitem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../../utils/auth";

interface UserProfileCardProps {
  profile: {
    name: string;
    email: string;
    phone?: string;
    is_premium: boolean;
    profile_picture?: string;
  };
}

const UserProfileCard = ({ profile }: UserProfileCardProps) => {
  const navigate = useNavigate();
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [language, setLanguage] = useState("English");

  const handleToggleNotifications = () => {
    setNotificationsOn(!notificationsOn);
  };

  const handleToggleLanguage = () => {
    setLanguage(language === "English" ? "Bahasa Indonesia" : "English");
  };

  const handlePremiumClick = () => {
    if (!profile.is_premium) {
      navigate("/premium");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  return (
    <div className="rounded-[30px] overflow-hidden bg-[#E9DDF4] shadow-lg relative font-spartan w-full max-w-2xl mx-auto">
      <button className="absolute top-4 left-4 text-white z-10" onClick={() => navigate("/")}>
        <XIcon className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>
      <button className="absolute top-5 right-5 text-white z-10" onClick={handleLogout}>
        <LogOut className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <div className="relative">
        <div className="h-40 rounded-t-3xl relative z-0">
          <div className="bg-[#593187] h-24" />
          <img src="/assets/Rectangle 51.svg" alt="" className="absolute bottom-0 left-0 w-full" />
        </div>

        <div className="relative z-10 -mt-20 flex flex-col items-center">
          <img src={ profile?.profile_picture || "/assets/photo-profil.svg"} alt="user" className="w-24 h-24 sm:w-28 sm:h-28 bg-[#E9DDF4] rounded-full items-center object-cover"/>
          {profile?.is_premium && (
            <img src="/assets/crown-prem.svg" alt="Premium" className="absolute -top-6 right-[33%] sm:right-[38%] w-10 h-10 sm:w-12 sm:h-12"/>
          )}
        </div>
      </div>

      <div className="text-center mt-4 px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold">{profile?.name}</h2>
        <p className="text-sm text-[#333] break-words">{profile?.email} | {profile?.phone || "-"}</p>
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
          <MenuItem label="Premium" value={profile?.is_premium ? "ON" : "OFF"} onClick={handlePremiumClick}>
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