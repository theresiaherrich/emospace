export interface UserProfile {
    id: number,
    name: string,
    username: string,
    email: string,
    phone: string,
    gender: string,
    birth_date: string,
    profile_picture?: string,
    is_premium: boolean
}

export const getUserProfileFromStorage = (): UserProfile | null => {
  try {
    const stored = localStorage.getItem("userProfile");
    return stored ? JSON.parse(stored) as UserProfile : null;
  } catch (err) {
    console.error("Failed to parse user profile:", err);
    return null;
  }
};

export const isUserPremium = (): boolean => {
  const profile = getUserProfileFromStorage();
  return Boolean(profile?.is_premium);
};

export const saveUserProfileToStorage = (profile: UserProfile) => {
  localStorage.setItem("userProfile", JSON.stringify(profile));
};