import { Outlet } from "react-router-dom";

export const ChatbotLayout = () => {
    return (
        <div className="bg-chatbot bg-cover bg-[center_top] bg-no-repeat min-h-screen w-full">
            <Outlet />
        </div>
    );
};