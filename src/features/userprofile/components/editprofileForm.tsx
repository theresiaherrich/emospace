import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "../../../components/ui/button";
import Input from "../../../components/ui/input";
import Dropdown from "../../../components/ui/dropdown";
import { CalendarPicker } from "../../../components/ui/calendar";
import { CameraIcon } from "lucide-react";

const genderOptions = ["Male", "Female"];

interface EditProfileFormProps {
  user: {
    name: string;
    email: string;
    phone: string;
    gender: string;
    birth_date: string;
    address: string;
    profile_picture?: string | File;
  };
  onSubmit: (data: any) => void;
  previewImage: string;
  setPreviewImage: (url: string) => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ user, onSubmit, setPreviewImage }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { control, handleSubmit, register, setValue } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      gender: user?.gender,
      birth_date: new Date(user?.birth_date),
      address: user?.address,
      profile_picture: user?.profile_picture ?? "",
    },
  });

  const handleProfile = (data: any) => {
    const finalData = {
      ...data,
      birth_date: data.birth_date.toISOString().split("T")[0],
    };
    onSubmit(finalData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setValue("profile_picture", file);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleProfile)} className="flex flex-col gap-4 w-full max-w-md font-lexend">
      <div className="relative z-10 -mt-4 flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute -top-6 sm:-top-8 right-[36%] sm:right-[38%]"
        >
          <CameraIcon
            fill="white"
            className="w-7 h-7 sm:w-9 sm:h-9 text-slate-100 cursor-pointer"
          />
        </button>
      </div>
      <Input
        type="text"
        placeholder="Enter your name..."
        title="Name"
        className="w-full bg-white border border-[#9E9E9E]"
        {...register("name")}
      />
      <Input
        type="email"
        placeholder="Enter your email..."
        title="Email"
        className="w-full bg-white border border-[#9E9E9E]"
        {...register("email")}
      />
      <Input
        type="text"
        placeholder="Enter your address..."
        title="Address"
        className="w-full bg-white border border-[#9E9E9E]"
        {...register("address")}  
      />
      <Input
        type="tel"
        placeholder="Enter your phone number..."
        title="Phone Number"
        className="w-full bg-white border border-[#9E9E9E]"
        {...register("phone")}
      />
      <Controller
        name="birth_date"
        control={control}
        render={({ field }) => (
          <CalendarPicker
            label="Birth Date"
            value={field.value}
            onChange={field.onChange}
            variant="day"
            className="w-full bg-white border border-[#9E9E9E]"
          />
        )}
      />
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <Dropdown
            label="Gender"
            options={genderOptions}
            value={field.value}
            onChange={field.onChange}
            className="w-full bg-white border border-[#9E9E9E]"
          />
        )}
      />
      <Button type="submit" variant="primary" className="w-fit mx-auto px-20 py-3 mt-5 bg-[#341A55]">
        Save
      </Button>
    </form>
  );
};

export default EditProfileForm;