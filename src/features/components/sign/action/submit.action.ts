"use server"
import {createClient} from "@/src/utils/supabase/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function signUpAction({email, password, confirmPassword} : {email: string, password: string, confirmPassword: string}) {

    if (!email || !password || !confirmPassword) {
        return {success: false, message: "all fields must be completed"};
    }

    if(password != confirmPassword){
        return {success: false, message: "Passwords did not match"};
    }

    const supabase = await createClient();

    const { error } = await supabase.auth
        .signUp({
            email,
            password: password,
            options: {
            emailRedirectTo: `${BASE_URL}/auth/callback`
        }
    });

    if(error) {
        return {success: false, message: "email alreary exist"};
    }

    return {success: true, message: ""};
};


export async function signInAction({email, password} : {email: string, password: string}) {

    if (!email || ! password) {
        return {success: false, message: "all fields must be completed"};
    }

    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    if(error) {
        return {success: false, message: "incorrect email or password"};
    }
    return {success: true, message: ""}
};