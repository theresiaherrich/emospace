import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/button";
import Input from "../../../components/ui/input";
import Dropdown from "../../../components/ui/dropdown";
import { CalendarPicker } from "../../../components/ui/calendar";

const genderOptions = ["Male", "Female"];

interface EditProfileFormProps {
  user: {
    name: string;
    email: string;
    phone: string;
    gender: string;
    birthdate: string;
    address: string;
  };
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
    gender: string;
    birthdate: string;
    address: string;
  }) => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ user, onSubmit }) => {
  const navigate = useNavigate();

  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      birthdate: new Date(user.birthdate),
      address: user.address,
    },
  });

  const handleProfile = (data: any) => {
    const finalData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      birthdate: data.birthdate.toISOString().split("T")[0],
      address: data.address,
    };

    onSubmit(finalData);
    navigate("/user-profile");
  };

  return (
    <form
      onSubmit={handleSubmit(handleProfile)}
      className="flex flex-col gap-4 w-full max-w-md font-lexend"
    >
      <Input
        type="text"
        placeholder="Enter your name..."
        title="Name"
        className={`w-full bg-white border border-[#9E9E9E] bg-opacity-100`}
        {...register("name")}
      />
      <Input
        type="email"
        placeholder="Enter your email..."
        title="Email"
        className="w-full bg-white border border-[#9E9E9E] bg-opacity-100"
        {...register("email")}
      />
      <Input
        type="text"
        placeholder="Enter your address..."
        title="Address"
        className="w-full bg-white border border-[#9E9E9E] bg-opacity-100"
        {...register("address")}
      />
      <Input
        type="tel"
        placeholder="Enter your phone number..."
        title="Phone Number"
        className="w-full bg-white border border-[#9E9E9E] bg-opacity-100"
        {...register("phone")}
      />
      <Controller
        name="birthdate"
        control={control}
        render={({ field }) => (
          <CalendarPicker
            label="Birth Date"
            value={field.value}
            onChange={field.onChange}
            variant="day"
            className="w-full bg-white border border-[#9E9E9E] bg-opacity-100"
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
            className="w-full bg-white border border-[#9E9E9E] bg-opacity-100"
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
