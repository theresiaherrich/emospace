import { useState, useEffect } from "react";

interface PaymentDetailCardProps {
  orderId: string;
  price: number;
}

const PaymentDetailCard = ({ orderId, price }: PaymentDetailCardProps) => {
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0px_0px_10px_0px_#00000040] py-6 px-6 sm:px-8 w-full">
      <div className="flex flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div className="flex flex-col justify-start">
          <h2 className="text-base sm:text-xl italic font-spartan">Total</h2>
          <h1 className="text-2xl sm:text-4xl font-spartan font-bold">
            Rp {price.toLocaleString("id-ID")}
          </h1>
          <p className="text-base sm:text-xl font-spartan">Order ID {orderId}</p>
        </div>
        <div className="flex flex-col justify-end items-end">
          <h2 className="text-base sm:text-xl italic font-spartan">
            Complete Payment In:
          </h2>
          <p className="text-xl sm:text-2xl font-semibold text-[#351A57] font-spartan">
            {formatTime(timeLeft)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailCard;
