"use client";
import { SignBtn, SignInput } from "@/src/features/components/sign/inputs";
import {FormEvent, useState} from "react";
import { createClient } from "@/src/utils/supabase/client";
import {useRouter} from "next/navigation";
import {Session, User} from "@supabase/auth-js";

type AuthData = {
    user: User | null;
    session: Session | null;
} | null;

export function SignUpForm() {

    const [data, setData] = useState<AuthData>();

    const handleEmailSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const email = formData.get("Email") as string | null;
        const password = formData.get("Password") as string | null;
        const confirmPassword = formData.get("Confirm password") as string | null;

        if (!email || !password || !confirmPassword) {
            console.log("Email is required"); // Prochaine étape : toaster
            return;
        }

        if(password != confirmPassword){
            console.log("passwords did not match");
            return;
        }

        const supabase = createClient();

        const { data, error } = await supabase.auth
            .signUp({
                email,
                password: password,
                options: {
                emailRedirectTo: 'http://localhost:3000/auth/callback'
            }
        });

        setData(data);

        if(error) {
            console.log(error);
            return;
        }
    };

    if(data?.user != null) {
        return <div className="w-full p-4">
            <h1>check your email and click on the link</h1>
        </div>
    }

    return <form onSubmit={handleEmailSubmit}>
        <SignInput holder="Email" name="Email" type="email" />
        <SignInput holder="Password" name="Password" type="password" />
        <SignInput holder="Confirm password" name="Confirm password" type="password" />
        <SignBtn name="Continue" />
    </form>
}

export function SignInForm() {

    const router = useRouter()

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

        const supabase = createClient()

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if(error) {
            console.log(error);
            return;
        }

        router.push("/");
    };

    return <form onSubmit={handlePasswordSubmit}>
        <SignInput holder="Email" name="Email" type="email" />
        <SignInput holder="Password" name="Password" type="password" />
        <SignBtn name="Sign in" />
    </form>
}
