import {FileInput, SignBtn, SignInput} from "@/src/features/components/sign/inputs";
import { createClient } from "@/src/utils/supabase/server";
import {redirect} from "next/navigation";

export async function SignUpForm() {

    const handleEmailSubmit = async (formData: FormData) => {
        "use server"

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

        const supabase = await createClient();

        const { error } = await supabase.auth
            .signUp({
                email,
                password: password,
                options: {
                emailRedirectTo: 'http://localhost:3000/auth/callback'
            }
        });

        if(error) {
            console.log(error);
            return;
        }

        redirect("/sign/verify")
    };

    return <form action={handleEmailSubmit}>
        <SignInput holder="Email" name="Email" type="email" />
        <SignInput holder="Password" name="Password" type="password" />
        <SignInput holder="Confirm password" name="Confirm password" type="password" />
        <SignBtn name="Continue" />
    </form>
}

export async function SignInForm() {

    const handlePasswordSubmit = async (formData: FormData) => {
        "use server";

        const email = formData.get("Email") as string | null;
        const password = formData.get("Password") as string | null;

        if (!email || ! password) {
            console.log("Email is required"); // Prochaine étape : toaster
            return;
        }

        const supabase = await createClient()

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if(error) {
            console.log(error);
            return;
        }

        redirect("/")
    };

    return <form action={handlePasswordSubmit}>
        <SignInput holder="Email" name="Email" type="email" />
        <SignInput holder="Password" name="Password" type="password" />
        <SignBtn name="Sign in" />
    </form>
}
export async function SignMetadataForm() {

    async function handleSubmit(formData: FormData) {
        "use server";

        const rawFormData = {
            file: formData.get('Picture') as File | null,
            username: formData.get('Username') as string | null
        }

        if(!rawFormData.file || !rawFormData.username){
            console.log("error");
            return;
        }

        const supabase = await createClient()

        const {data: userData} = await supabase.auth.getUser();

        const {error: fileError} = await supabase.storage.from('images')
            .upload(`${userData.user?.id}/avatar.png`, rawFormData.file, {
                upsert: true,
            })
        if(fileError) {
            console.log(fileError);
        }

        const { error } = await supabase.auth.updateUser({
            data: {
                name: rawFormData.username
            }
        })

        if(error){
            console.log(error);
        }

        redirect("/");
    }

    return <form action={handleSubmit}>
        <FileInput name="Picture"/>
        <div className="mt-4 w-44">
            <SignInput name="Username" type="text" />
            <SignBtn name="Submit" />
        </div>
    </form>
}