import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#593187] text-white font-spartan py-10 w-full">
      <div className="ml-4 md:ml-10 lg:ml-20 lg:mr-80">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-4 w-full max-w-[265px]">
            <h1 className="font-bold text-2xl">EmoSpace</h1>
            <p className="font-medium text-base">
              EmoSpace is a safety space for tracking your daily emotions and reflecting on our life.
            </p>
            <div className="flex flex-col font-medium text-base">
              <a href="#">Our Team</a>
              <a href="#">Key Feature</a>
              <a href="#">Blog & Articles</a>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-[265px]">
            <h2 className="font-medium text-xl">Need Helps?</h2>
            <div className="flex flex-col font-medium text-base">
              <a href="#">Frequently Asked Questions (FAQ)</a>
              <a href="#">Help Center</a>
              <a href="#">Contact Us</a>
              <a href="#">Send Suggestion</a>
              <a href="#">Join Community</a>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-[265px]">
            <h2 className="font-medium text-xl">Essential Information</h2>
            <div className="flex flex-col font-medium text-base">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
              <a href="#">Cookie Settings</a>
            </div>
            <p className="font-medium text-base">Follow Us</p>
            <div className="flex gap-4">
              <a href="#"><Twitter className="w-6 h-6 text-white hover:text-gray-300" /></a>
              <a href="#"><Facebook className="w-6 h-6 text-white hover:text-gray-300" /></a>
              <a href="#"><Instagram className="w-6 h-6 text-white hover:text-gray-300" /></a>
              <a href="#"><Youtube className="w-6 h-6 text-white hover:text-gray-300" /></a>
            </div>
          </div>
        </div>

        <p className="text-left font-medium text-base mt-8">
          © 2025 EmoSpace BCC Little Baby. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
