import { CalendarIcon, XIcon, Clock } from "lucide-react";
import PaymentMethod from "./metodePayment";
import PaymentDetailCard from "./totalpaymentCard";
import { useState } from "react";
import { format, addMonths } from "date-fns";
import { useLocation } from "react-router-dom";

const PaymentCard = () => {
  const location = useLocation();
  const { paymentType, premiumType, period, price } = location.state || {};
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const startDate = new Date();
  let endDate = startDate;

  if (premiumType === "Monthly") {
    endDate = addMonths(startDate, 1);
  } else if (premiumType === "Quarterly") {
    endDate = addMonths(startDate, 3);
  } else if (premiumType === "Annual") {
    endDate = addMonths(startDate, 12);
  }

  const formattedPeriod = `${format(startDate, "d MMMM yyyy")} - ${format(endDate, "d MMMM yyyy")}`;

  return (
    <div className="rounded-3xl shadow-[5px_5px_10px_0px_#00000040] h-auto mt-20 mb-12 relative">
      <button className="absolute top-5 right-5 z-10" onClick={() => window.history.back()}>
        <XIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white font-extrabold" />
      </button>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#633796] pt-10 px-6 sm:px-14 pb-24 rounded-t-3xl">
        {paymentType === "premium" ? (
          <img src="/assets/crown.svg" alt="" className="w-20 sm:w-28" />
        ) : (
          <img src="/assets/specialist-icon.svg" alt="" className="w-20 sm:w-24" />
        )}
        <div className="flex flex-col text-white">
          <h1 className="font-spartan text-lg sm:text-2xl md:text-3xl font-bold uppercase">
            {paymentType === "premium"
              ? `${period} ACCESS TO MOOD TRACKER'S SUMMARY`
              : "LIVE CHAT SESSION WITH SPECIALIST"}
          </h1>
          <div className="flex items-center gap-2">
            {paymentType === "premium" ? (
              <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
            <p className="font-spartan text-sm sm:text-xl font-medium uppercase">
              {paymentType === "premium"
                ? formattedPeriod
                : "for ONE SESSION USE only"}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute left-0 right-0 mx-4 sm:mx-12 top-64 sm:top-44 z-10">
        <PaymentDetailCard orderId="123456789" price={price} />
      </div>

      {selectedPayment ? (
        <div className="flex flex-col items-start justify-start gap-4 pt-24 px-6 sm:px-12 pb-12 bg-white rounded-b-3xl">
          {selectedPayment === "qris" || selectedPayment === "gopay" ? (
            <div className="flex flex-col items-center justify-center mx-auto gap-4">
              <img
                src={`/assets/payment-${selectedPayment}.svg`}
                alt="Payment Method"
                className="w-20 sm:w-24"
              />
              <img
                src={`/assets/qr-${selectedPayment}.svg`}
                alt="QR Code"
                className="w-full max-w-sm object-contain"
              />
              <p className="text-[#8B8B8B] text-lg sm:text-2xl">
                NMID : IDXXXXXXXXXX
              </p>
            </div>
          ) : (
            <div className="bg-gray-100 p-4 rounded-xl justify-center items-center text-center mx-auto">
              <p className="text-gray-600 text-sm sm:text-base">Virtual Account Number</p>
              <p className="text-lg sm:text-xl font-semibold text-[#633796] tracking-wide">
                1234 5678 9012 3456
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-start justify-start gap-4 pt-24 px-6 sm:px-12 pb-12 bg-white rounded-b-3xl">
          <h1 className="text-[#515151] font-spartan text-base sm:text-xl italic">
            Metode Pembayaran
          </h1>
          <PaymentMethod method="bank" onSelect={setSelectedPayment} />
          <PaymentMethod method="e-wallet" onSelect={setSelectedPayment} />
          <PaymentMethod method="qris" onSelect={setSelectedPayment} />
        </div>
      )}
    </div>
  );
};

export default PaymentCard;
