import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/button";
import Input from "../../../components/ui/input";
import Dropdown from "../../../components/ui/dropdown";
import { CalendarPicker } from "../../../components/ui/calendar";

const genderOptions = ["Male", "Female"];

interface RegisterFormProps {
  onSubmit: (data: {
    email: string;
    username?: string;
    password: string;
    confirm_password: string;
    name: string;
    gender: string;
    birth_date: string;
    agree_to_terms: boolean;
  }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const { control, register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleRegister = (data: any) => {
    if (data.password !== data.confirm_password) {
      alert("Passwords do not match.");
      return;
    }
    if (!data.agree_to_terms) {
      alert("You must agree to the privacy policy.");
      return;
    }

    const birthdate = data.birth_date instanceof Date
      ? data.birth_date.toISOString().split("T")[0]
      : "";

    const finalData = {
      email: data.email,
      password: data.password,
      name: data.name,
      gender: data.gender,
      birth_date: birthdate,
      confirm_password: data.confirm_password,
      agree_to_terms: data.agree_to_terms,
      username: data.username || undefined,
    };

    onSubmit(finalData);
    navigate("/login");
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="flex flex-col gap-4 w-full max-w-md font-lexend"
    >
      <Input
        type="text"
        placeholder="Enter your name..."
        title="Name"
        required
        className="w-full"
        {...register("name")}
      />
      <Input
        type="email"
        placeholder="Enter your email..."
        title="Email"
        required
        className="w-full"
        {...register("email")}
      />
      <Controller
        name="gender"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Dropdown
            label="Gender"
            options={genderOptions}
            value={field.value}
            onChange={field.onChange}
            required
            placeholder="Gender"
          />
        )}
      />
      <Controller
        name="birth_date"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CalendarPicker
            label="Birth Date"
            value={field.value}
            onChange={field.onChange}
            required
            variant="day"
          />
        )}
      />
      <Input
        type="password"
        placeholder="Enter your password..."
        title="Password"
        required
        className="w-full"
        {...register("password")}
      />
      <Input
        type="password"
        placeholder="Confirm your password..."
        title="Confirm Password"
        required
        className="w-full"
        {...register("confirm_password")}
      />
      <label className="flex items-center gap-2 text-xs text-[#474747]">
        <input type="checkbox" className="accent-[#593187]" {...register("agree_to_terms")} />
        By registering in emoSpace, I agree to the privacy policy.
      </label>
      <Button type="submit" variant="primary" className="w-full">Save</Button>
      <p className="text-xs font-medium text-[#474747] text-center">
        Already have an account?{" "}
        <a href="/login" className="text-[#341A55]">Please log in.</a>
      </p>
    </form>
  );
};

export default RegisterForm;
