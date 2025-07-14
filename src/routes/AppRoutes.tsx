import { Routes, Route } from 'react-router-dom';
import { AuthLayout } from '../layouts/authLayout';
import RegisterPage from '../pages/register';
import LoginPage from '../pages/login';
import MainLayout from '../layouts/mainLayout';
import HomePage from '../pages/home';
import AISpace from '../pages/aispace';
import { ChatbotLayout } from '../layouts/chatbotLayout';
import SpaceChatbotPage from '../pages/spaceChatbot';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/aispace" element={<AISpace />} />
      </Route>
      <Route element={<ChatbotLayout />}>
        <Route path="/space-chat" element={<SpaceChatbotPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;