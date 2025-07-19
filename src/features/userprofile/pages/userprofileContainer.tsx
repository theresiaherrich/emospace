import UserProfileCard from "../components/userprofileCard";

const UserProfileContainer = () => {
  return (
    <div>
      <UserProfileCard
        name="John Doe"
        email="a9Jd8@example.com"
        phone="+1234567890"
        isPremium={true}
      ></UserProfileCard>
    </div>
  );
}

export default UserProfileContainer;