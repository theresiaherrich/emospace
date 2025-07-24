import { CalendarIcon, XIcon, Clock } from "lucide-react";
import PaymentDetailCard from "./totalpaymentCard";
import { useState, useEffect } from "react";
import { format, addMonths } from "date-fns";
import { useLocation } from "react-router-dom";
import { getPaymentPremium, getPaymentSpecialist, postCallbackPayment } from "../../../services/paymentservice";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    snap: any;
  }
}

const PaymentCard = () => {
  const location = useLocation();
  const {
    paymentType = "premium",
    premiumType = "Monthly",
    period = "Monthly",
    price = 0,
    id,
  } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", "Mid-client-4-JvNOPZgZvhlZae");
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!id || isNaN(id)) {
      alert("ID pembayaran tidak ditemukan!");
      console.error("Invalid or undefined ID:", id);
      return;
    }

    try {
      setLoading(true);
      const response =
        paymentType === "premium"
          ? await getPaymentPremium(id)
          : await getPaymentSpecialist(id);

      const snapToken = response.token;

      if (!snapToken) {
        throw new Error("Snap token kosong");
      }

      window.snap.pay(snapToken, {
        onSuccess: async (result: any) => {
          try {
            await postCallbackPayment({
              order_id: result.order_id,
              transaction_status: result.transaction_status,
            });
            setIsPaid(true);
            alert("Pembayaran berhasil!");
            navigate("/");
          } catch (err) {
            console.error("Callback error:", err);
            alert("Pembayaran berhasil, tapi gagal mengirim callback ke server.");
          }
        },
        onPending: () => {
          alert("Pembayaran menunggu.");
          navigate("/");
        },
        onError: (err: any) => {
          console.error("Error:", err);
          alert("Pembayaran gagal.");
        },
        onClose: () => {
          console.log("Snap modal ditutup.");
          navigate("/");
        },
      });
    } catch (err) {
      console.error("Gagal memulai pembayaran:", err);
      alert("Gagal memulai pembayaran");
    } finally {
      setLoading(false);
    }
  };

  const startDate = new Date();
  let endDate = startDate;

  if (premiumType === "Monthly") {
    endDate = addMonths(startDate, 1);
  } else if (premiumType === "Quarterly") {
    endDate = addMonths(startDate, 3);
  } else if (premiumType === "Annual") {
    endDate = addMonths(startDate, 12);
  }

  const formattedPeriod = `${format(startDate, "d MMMM yyyy")} - ${format(
    endDate,
    "d MMMM yyyy"
  )}`;

  return (
    <div className="rounded-3xl shadow-[5px_5px_10px_0px_#00000040] h-auto mt-20 mb-12 relative">
      <button
        className="absolute top-5 right-5 z-10"
        onClick={() => window.history.back()}
      >
        <XIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white font-extrabold" />
      </button>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#633796] pt-10 px-6 sm:px-14 pb-24 rounded-t-3xl">
        {paymentType === "premium" ? (
          <img src="/assets/crown.svg" alt="" className="w-20 sm:w-28" />
        ) : (
          <img
            src="/assets/specialist-icon.png"
            alt=""
            className="w-20 sm:w-24"
          />
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
        <PaymentDetailCard orderId={id || "123456789"} price={price} />
      </div>

      <div className="flex flex-col items-center justify-center gap-4 pt-24 px-6 sm:px-12 pb-12 bg-white rounded-b-3xl">
        <button
          onClick={handlePayment}
          disabled={loading || isPaid}
          className={`w-full py-3 rounded-xl text-white font-bold text-lg transition ${
            isPaid
              ? "bg-green-500 cursor-not-allowed"
              : loading
              ? "bg-gray-400"
              : "bg-[#633796] hover:bg-[#4f2b74]"
          }`}
        >
          {isPaid ? "Pembayaran Berhasil" : loading ? "Memproses..." : "Bayar Sekarang"}
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
