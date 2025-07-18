import { Routes, Route } from 'react-router-dom';
import { AuthLayout } from '../layouts/authLayout';
import RegisterPage from '../pages/register';
import LoginPage from '../pages/login';
import MainLayout from '../layouts/mainLayout';
import HomePage from '../pages/home';
import AISpace from '../pages/aispace';
import { ChatbotLayout } from '../layouts/chatbotLayout';
import SpaceChatbotPage from '../pages/spaceChatbot';
import SpecialistPage from '../pages/specialist';
import MyjournalPage from '../pages/myjournal';
import DetailJournalPage from '../pages/detailjournal';
import ScrollToTop from '../components/scrolltotop';
import PremiumPage from '../pages/premium';
import PaymentPage from '../pages/payment';

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/aispace" element={<AISpace />} />
          <Route path="/specialist" element={<SpecialistPage />} />
          <Route path="/my-journal" element={<MyjournalPage />} />
          <Route path="/my-journal/detail/:id" element={<DetailJournalPage />} />
          <Route path="/premium" element={<PremiumPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Route>
        <Route element={<ChatbotLayout />}>
          <Route path="/space-chat" element={<SpaceChatbotPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;