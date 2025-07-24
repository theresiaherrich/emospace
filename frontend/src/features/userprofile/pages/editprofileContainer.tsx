import { useEffect, useState } from "react";
import EditProfileCard from "../components/editprofileCard";
import { getUserProfile, updateUserProfile } from "../../../services/userservice";
import { useNavigate } from "react-router-dom";

const EditProfileContainer = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserProfile();
        const profile = {
          name: res?.name,
          email: res?.email,
          phone: res?.phone,
          gender: res?.gender,
          birth_date: res?.birth_date,
          address: res?.address || "",
          profile_picture: res?.profile_picture || "",
        };
        setUser(profile);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("gender", data.gender);
      formData.append("birth_date", data.birth_date);
      formData.append("address", data.address);
      if (data.profile_picture instanceof File) {
        formData.append("profile_picture", data.profile_picture);
      }

      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      console.log("profile_picture", data.profile_picture);

      await updateUserProfile(formData);
      alert("Profile updated successfully");
      navigate("/user-profile");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to update profile");
    }
  };

  return user && <EditProfileCard user={user} onSubmit={handleSubmit} />;
};

export default EditProfileContainer;