"use client";

import { forwardRef } from "react";
import { IconType } from "react-icons";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register?: any;
  errors?: any;
  icon?: IconType;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  id,
  label,
  type = "text",
  disabled,
  required,
  register,
  errors,
  icon: Icon,
  value,
  onChange,
}, ref) => {
  return (
    <div className="w-full relative">
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-3
            top-3
            text-neutral-400
          "
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register}
        placeholder=" "
        type={type}
        value={value}
        onChange={onChange}
        className={`
          peer
          w-full
          p-4
          pt-6
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${Icon ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      />
      <label
        className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          z-10
          origin-[0]
          ${Icon ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
      {errors[id] && (
        <span className="text-rose-500 text-sm">
          {errors[id].message}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
