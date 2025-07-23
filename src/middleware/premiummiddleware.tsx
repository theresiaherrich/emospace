import { Navigate, useLocation } from "react-router-dom";
import { isUserPremium } from "../utils/user";

const PremiumMiddleware = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  if (!isUserPremium()) {
    return <Navigate to="/premium" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PremiumMiddleware;