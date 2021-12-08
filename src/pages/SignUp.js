import React from "react";
import { useForm } from "react-hook-form";
import { createUser } from "../auth/createUser";

export const Signup = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    createUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Email
        <input
          type="email"
          name="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          placeholder="Password"
          {...register("password", { required: true, minLength: 6 })}
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};
