import { useEffect, useState } from "react";
import { getUserProfile } from "../../../services/userservice";
import UserProfileCard from "../components/userprofileCard";

const UserProfileContainer = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    getUserProfile()
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => {
        console.error("Failed to fetch user profile:", err);
      })
  }, []);

  return (
    <UserProfileCard profile={profile} />
  );
};

export default UserProfileContainer;