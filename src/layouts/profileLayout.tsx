import { Outlet } from "react-router-dom";

export const ProfileLayout = () => {
  return (
    <div className="bg-profile bg-cover bg-center bg-no-repeat min-h-screen w-full">
      <div className="flex items-center justify-center min-h-screen px-4 py-6">
        <Outlet />
      </div>
    </div>
  );
};
