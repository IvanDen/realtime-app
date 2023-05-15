"use client";
import * as React from "react";
import Button from "@/components/ui/Button";
import { addFriendValidator } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

interface AddFriendButtonProps {}

type FormData = z.infer<typeof addFriendValidator>;
export const AddFriendButton: React.FC<AddFriendButtonProps> = ({}) => {
    const [showSuccessState, setShowSuccessState] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(addFriendValidator),
    });
    const addFriend = async (email: string) => {
        try {
            const validatedEmail = addFriendValidator.parse({ email });
            await axios.post("/api/friends/add", {
                email: validatedEmail,
            });
            setShowSuccessState(true);
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError("email", { message: err.message });
                return;
            }
            if (err instanceof AxiosError) {
                setError("email", { message: err.response?.data });
                return;
            }
            setError("email", { message: "Something went wrong." });
        }
    };

    const onSubmit = async (data: FormData) => {
        addFriend(data.email);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Add friend by E-Mail
            </label>
            <div className="mt-2 flex gap-4">
                <input
                    {...register("email")}
                    type="text"
                    className="block w-full rounded-md borded-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="example@example.com"
                />
                <Button>Add</Button>
            </div>
            <p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>
            {showSuccessState ? (
                <p className="mt-1 text-sm text-green-600">Friend request sent!</p>
            ) : null}
        </form>
    );
};
