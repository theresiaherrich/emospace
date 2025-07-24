import Card from "../../../components/ui/card";

interface PremiumCardProps {
  variant?: "primary" | "secondary";
  onClick?: () => void;
  premiumType?: "Monthly" | "Quarterly" | "Annual";
  value?: string;
  price?: string;
  period?: string;
  description?: string;
}

const PremiumCard = ({
  variant,
  onClick,
  premiumType,
  value,
  price,
  period,
  description,
}: PremiumCardProps) => {
  return (
    <Card
      className={`w-full max-w-[340px] sm:w-[90%] md:w-[320px] py-14 px-5 rounded-3xl shadow-[0px_4px_4px_0px_#00000040] ${
        variant === "primary" ? "bg-[#4E00B2]" : "bg-white"
      } relative`}
    >
      <div className="flex flex-col items-center justify-center gap-7">
        <div className="flex flex-col items-center gap-2">
          <p
            className={`font-spartan text-xl text-center ${
              variant === "primary" ? "text-white" : "text-black"
            }`}
          >
            {premiumType}
          </p>
          <h2
            className={`py-2 px-7 rounded-full w-full font-spartan text-3xl font-medium text-center ${
              variant === "primary"
                ? "text-[#4E00B2] bg-white"
                : "text-white bg-[#210068]"
            }`}
          >
            {value}
          </h2>
        </div>

        <h1
          className={`w-full max-w-[299px] font-spartan text-3xl text-center ${
            variant === "primary" ? "text-white" : ""
          }`}
        >
          Rp{" "}
          <span
            className={`text-6xl font-bold ${
              variant === "primary" ? "text-white" : "text-[#7206FF]"
            }`}
          >
            {price}
          </span>{" "}
          <br />
          <span className="text-[#AEAEAE] font-semibold">/{period}</span>
        </h1>

        {/* Description */}
        <p
          className={`w-full max-w-[200px] font-spartan text-xl text-center font-medium ${
            variant === "primary" ? "text-white" : "text-[#565353]"
          }`}
        >
          {description}
        </p>
      </div>
      <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
        <button
          className={`py-2 px-6 rounded-full font-spartan text-xl font-semibold transition-colors text-center shadow-[0px_4px_4px_0px_#00000040] ${
            variant === "primary"
              ? "bg-white hover:bg-[#7B15FF] text-[#7B15FF] hover:text-white"
              : "bg-[#7B15FF] hover:bg-white text-white hover:text-[#7B15FF]"
          }`}
          onClick={onClick}
        >
          Upgrade
        </button>
      </div>
    </Card>
  );
};

export default PremiumCard;