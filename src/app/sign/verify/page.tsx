import { SignBtn } from "@/src/features/components/sign/inputs";
import {createClient} from "@/src/utils/supabase/server";
import {redirect} from "next/navigation";


export default function VerifyPage() {

    async function goNext() {
        "use server"
        const supabase = await createClient()

        const {data: userData} = await supabase.auth.getUser();

        if(userData.user != null){
            redirect("/");
        }
    } 

    return <div className="w-full">
        <h1>A confirmation email has been sent to your email address, click on the link and then click on the button below</h1>
        <form action={goNext}>
            <SignBtn name="Continue" />
        </form>
    </div>
}