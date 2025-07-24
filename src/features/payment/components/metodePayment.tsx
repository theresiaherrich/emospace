import { ChevronRight } from "lucide-react";

interface PaymentMethodProps {
    method?: "bank" | "e-wallet" | "qris";
    onSelect?: (val: string) => void;
}

const PaymentMethod = ({ method, onSelect }: PaymentMethodProps) => {

    return (
        <div className="flex pb-3 border-b border-gray-400 justify-between w-full">
            <div className="flex flex-col gap-2 justify-start">
                <h1 className="text-[#515151] font-spartan text-2xl font-bold">
                    {method === "bank" ? "Transfer Bank" : method === "e-wallet" ? "e-Wallet" : "QRIS"}
                </h1>
                <div className="flex items-start gap-4 justify-start">
                    {method === "bank" ? (
                        <>
                            <button onClick={() => onSelect?.("bca")}>
                                <img src="/assets/bank-bca.svg" alt="" className="h-12 rounded-xl"/>
                            </button>
                            <button onClick={() => onSelect?.("bni")}>
                                <img src="/assets/bank-bni.svg" alt="" className="h-12 rounded-xl"/>
                            </button>
                            <button onClick={() => onSelect?.("mandiri")}>
                                <img src="/assets/bank-mandiri.svg" alt="" className="h-12 rounded-xl"/>
                            </button>
                            <button onClick={() => onSelect?.("bri")}>
                                <img src="/assets/bank-bri.svg" alt="" className="h-12 rounded-xl"/>
                            </button>
                            <button onClick={() => onSelect?.("bsi")}>
                                <img src="/assets/bank-bsi.svg" alt="" className="h-12 rounded-xl"/>
                            </button>
                        </>
                    ) : method === "e-wallet" ? (
                        <>
                            <button onClick={() => onSelect?.("gopay")}>
                                <img src="/assets/e-gopay.svg" alt="" className="h-12 rounded-xl"/>
                            </button>
                            <button onClick={() => onSelect?.("spay")}>
                                <img src="/assets/e-spay.svg" alt="" className="h-12 rounded-xl"/>
                            </button>
                            <button onClick={() => onSelect?.("dana")}>
                                <img src="/assets/e-dana.svg" alt="" className="h-12 rounded-xl"/>
                            </button>
                            <button onClick={() => onSelect?.("ovo")}>
                                <img src="/assets/e-ovo.svg" alt="" className="h-12 rounded-xl"/>
                            </button>
                        </>
                    ) : (
                        <button onClick={() => onSelect?.("qris")}>
                            <img src="/assets/qris.svg" alt="" className="h-12 rounded-xl"/>
                        </button>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-end">
                <ChevronRight className="h-14"/>
            </div>
        </div>
    );
}

export default PaymentMethod;