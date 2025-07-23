import { XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EditProfileForm from "./editprofileForm";

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  gender: string;
  birth_date: string;
  address: string;
  profile_picture?: string;
};

interface EditProfileCardProps {
  user: UserProfile;
  onSubmit: (data: UserProfile) => void;
}

const EditProfileCard: React.FC<EditProfileCardProps> = ({ user, onSubmit }) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string>(user.profile_picture || "");

  return (
    <div className="rounded-[30px] overflow-hidden bg-[#E9DDF4] shadow-lg relative font-spartan w-full max-w-xl mx-6 sm:mx-auto">
      <button className="absolute top-4 left-4 text-white z-10" onClick={() => navigate(-1)}>
        <XIcon className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      <h1 className="absolute font-spartan font-semibold text-2xl sm:text-3xl text-white z-10 top-8 left-1/2 -translate-x-1/2">
        Edit Profile
      </h1>

      <div className="relative">
        <div className="h-40 rounded-t-3xl relative z-0">
          <div className="bg-[#593187] h-24"></div>
          <img src="/assets/Rectangle 51.svg" alt="" className="absolute bottom-0 left-0 w-full" />
        </div>

        <div className="relative z-10 -mt-20 flex flex-col items-center">
          <img
            src={preview || user?.profile_picture || "/assets/photo-profil.svg"}
            alt="user"
            className="w-24 h-24 sm:w-28 sm:h-28 bg-[#E9DDF4] rounded-full object-cover"
          />
        </div>
      </div>

      <div className="px-4 pb-8 pt-5 flex flex-col gap-4 justify-center items-center">
        <EditProfileForm
          user={user}
          onSubmit={onSubmit}
          previewImage={preview}
          setPreviewImage={setPreview}
        />
      </div>
    </div>
  );
};

export default EditProfileCard;