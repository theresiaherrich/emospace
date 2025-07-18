import PaymentCard from "../components/paymentCard";

const PaymentContainer = () => {
  return (
    <div className="bg-[#F3F3F3] bg-cover bg-no-repeat min-h-screen w-full relative overflow-hidden">
      <img src="/assets/gradient-purple.svg" alt="" className="absolute -top-60 left-10"/>
      <div className="flex flex-col min-h-screen relative z-10 px-4 sm:px-8 md:px-20 py-10">
        <PaymentCard />
      </div>
    </div>
  );
};

export default PaymentContainer;
