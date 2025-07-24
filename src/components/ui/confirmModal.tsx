import { XIcon } from "lucide-react";
import Button from "./button";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount?: number;
  message: string;
}

const ConfirmModal = ({ isOpen, onClose, onConfirm, amount, message }: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-4">
      <div className="bg-[#593187] shadow-[5px_5px_10px_0px_#00000040] rounded-3xl py-10 px-6 w-full max-w-sm sm:max-w-md relative">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <XIcon className="w-6 h-6 text-white" />
        </button>

        <h2 className="text-white text-lg sm:text-xl font-bold mb-2 text-center">
          {message}
        </h2>

        {amount && (
          <div className="text-center text-white text-lg sm:text-xl font-bold mb-8">
            <span>Rp {amount?.toLocaleString("id-ID")}?</span>
          </div>
        )}

        <div className="flex justify-center items-center gap-3">
          <Button variant="secondary" onClick={onClose} className="py-1 px-4">
            Kembali
          </Button>
          <Button variant="secondary" onClick={onConfirm} className="py-1 px-4">
            Lanjutkan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
