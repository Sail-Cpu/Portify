"use client";

import {FileInput, SignBtn, SignInput} from "@/src/features/components/sign/inputs";
import { FormEvent } from "react";
import { signUpAction, signInAction } from "./action/submit.action";
import {toast} from "sonner";
import { useRouter } from "next/navigation";
import {createClient} from "@/src/utils/supabase/client";

export function SignUpForm() {

    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);

        const body = {
            email: formData.get("Email") as string,
            password: formData.get("Password") as string,
            confirmPassword: formData.get("Confirm password") as string
        }

        const { success, message } = await signUpAction(body);

        if(!success) {
            toast.error(message);
        }

        router.push("/sign/verify")
    };

    return <form onSubmit={handleSubmit}>
        <SignInput holder="Email" name="Email" type="email" />
        <SignInput holder="Password" name="Password" type="password" />
        <SignInput holder="Confirm password" name="Confirm password" type="password" />
        <SignBtn name="Continue" />
    </form>
}

export function SignInForm() {

    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);

        const body = {
            email: formData.get("Email") as string,
            password: formData.get("Password") as string
        }

        const { success, message } = await signInAction(body)

        if(!success) {
            toast.error(message);
        }

        router.push("/")
    };

    return <form onSubmit={handleSubmit}>
        <SignInput holder="Email" name="Email" type="email" />
        <SignInput holder="Password" name="Password" type="password" />
        <SignBtn name="Sign in" />
    </form>
}
export function SignMetadataForm() {

    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);

        const supabase = createClient();

        const file =  formData.get("Picture") as File;
        const username = formData.get("Username") as string;

        if(!username || !file){
            toast.error("all fields must be completed")
            return;
        }

        const {data: userData} = await supabase.auth.getUser();

        const {error: fileError} = await supabase.storage.from('images')
            .upload(`${userData.user?.id}/avatar.png`, file, {
                upsert: true,
            })

        if(fileError) {
            toast.error("An error as occured with the image");
            return;
        }

        const { error } = await supabase.auth.updateUser({
            data: {
                name: username
            }
        })

        if(error) {
            toast.error("An error as occured with the name");
            return;
        }

        router.push("/")
    };

    return <form onSubmit={handleSubmit}>
        <FileInput name="Picture"/>
        <div className="mt-4 w-44">
            <SignInput name="Username" type="text" />
            <SignBtn name="Submit" />
        </div>
    </form>
}