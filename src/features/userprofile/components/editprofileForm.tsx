import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/button";
import Input from "../../../components/ui/input";
import Dropdown from "../../../components/ui/dropdown";
import { CalendarPicker } from "../../../components/ui/calendar";
import { useRef, useState } from "react";

const genderOptions = ["Male", "Female"];

interface EditProfileFormProps {
  user: {
    name: string;
    email: string;
    phone: string;
    gender: string;
    birth_date: string;
    address: string;
    profile_picture?: string;
  };
  onSubmit: (data: any) => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ user, onSubmit }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>(user?.profile_picture || "");

  const { control, handleSubmit, register, setValue } = useForm<{
    name: string;
    email: string;
    phone: string;
    gender: string;
    birth_date: Date;
    address: string;
    profile_picture: File | string;
  }>({
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
    navigate("/user-profile");
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
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
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
            placeholder="Select Gender"
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