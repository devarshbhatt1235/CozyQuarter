"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5"; // Import Close Icon

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: loginModal.email,
        password: loginModal.password,
      });

      if (result?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }

      if (result?.error) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, [loginModal, router]);

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back"
        subtitle="Login to your account!"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        required
        value={loginModal.email}
        onChange={(e) => loginModal.setEmail(e.target.value)}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        required
        value={loginModal.password}
        onChange={(e) => loginModal.setPassword(e.target.value)}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google', { callbackUrl: '/' })}
      />
      <Button 
        outline 
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github', { callbackUrl: '/' })}
      />
      <div className="
        text-neutral-500 
        text-center 
        mt-4 
        font-light
      ">
        <p>First time using CozyQuarter?
          <span 
            onClick={onToggle} 
            className="
              text-neutral-800 
              cursor-pointer 
              hover:underline
            "
            > Create an account</span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
