import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/usercontext";

const PremiumMiddleware = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user } = useUser();

  if (user === null) {
    return null;
  }

  if (!user.is_premium) {
    return <Navigate to="/premium" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PremiumMiddleware;