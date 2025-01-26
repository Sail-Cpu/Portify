"use server";
import Image, {StaticImageData} from "next/image";
import {createClient} from "@/src/utils/supabase/server";
import {SignInWithOAuthCredentials} from "@supabase/auth-js";
import {redirect} from "next/navigation";

export async function ProviderBtn({ logo, title }: { logo: StaticImageData, title: string }) {

    const provider = title.toLowerCase();

    async function signIn() {
        "use server";
        const supabase = await createClient();

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: "http://localhost:3000/auth/callback"
            }
        } as SignInWithOAuthCredentials)

        if(error){
            throw new Error("An error occured");
        }

        redirect(data.url)
    }

    return (
        <form action={signIn}>
            <button type="submit" className="flex items-center justify-center border border-grey py-2 px-12 rounded-lg hover:bg-grey transition">
                <Image className="w-6" src={logo} alt={title + "-logo"} />
                <span className="ml-4 font-semibold">{title}</span>
            </button>
        </form>
    );
}
export async function SignInput({name, type} : {name: string, type: string}) {
    return <div>
        <label className="font-medium">{name}</label>
        <input type={type} name={name} className="w-full p-1 px-4 text-lg border border-grey rounded-lg my-2 outline-blue" />
    </div>
}

export async function SignBtn({name} : {name: string}) {
    return <button className="w-full p-2 bg-blue text-white rounded-lg mt-4 mb-10">
        {name}
    </button>
}