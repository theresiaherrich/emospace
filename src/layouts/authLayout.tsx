import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="bg-register bg-cover bg-center bg-no-repeat min-h-screen w-full">
      <div className="flex items-center justify-center min-h-screen px-4 py-16">
        <Outlet />
      </div>
    </div>
  );
};
