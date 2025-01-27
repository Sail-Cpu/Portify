"use client";
import { SignBtn, SignInput } from "@/src/features/components/sign/inputs";
import {FormEvent, useEffect, useState} from "react";
import { createClient } from "@/src/utils/supabase/client";
import {useRouter} from "next/navigation";

export default function Form() {
    const [email, setEmail] = useState("");
    const [exist, setExist] = useState("sign");

    const router = useRouter()

    useEffect(() => {
        if(exist != "sign"){
            setExist("sign")
        }
    }, [email])

    const handleEmailSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const email = formData.get("Email") as string | null;

        if (!email) {
            console.log("Email is required"); // Prochaine étape : toaster
            return;
        }

        const supabase = createClient();
        const { data, error } = await supabase.auth.
        signUp({ email, password: "OpbsoletePassword" });

        if(error) {
            console.log(error);
            return;
        }

        if (data?.user?.identities?.length === 0) {
            setExist("signin");
            return;
        }

        setExist("signup");
    };

    const handleVerificationSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("verif")
    };

    const handlePasswordSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const email = formData.get("Email") as string | null;
        const password = formData.get("Password") as string | null;

        if (!email || ! password) {
            console.log("Email is required"); // Prochaine étape : toaster
            return;
        }

        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if(error) {
            console.log(error);
            return;
        }

        router.push("/");
    };

    const handleSubmit = (e: FormEvent) => {
        if(exist == "sign"){
            return handleEmailSubmit(e);
        }else if (exist == "signin"){
            return handlePasswordSubmit(e);
        }else{
            return handleVerificationSubmit(e);
        }
    }

    return  <form onSubmit={handleSubmit} className="w-full">
        <SignInput onchange={(e) => setEmail(e.currentTarget.value)} holder="Enter your email address..." name="Email" type="email" />
        {
            exist == "signin" &&
                <SignInput holder="Enter your password..." name="Password" type="password" />}
        {
            exist == "signup" &&
                <SignInput holder="Enter the code you received..." name="Verification code" type="text" />
        }
        <SignBtn name="Continue" />
    </form>
}
