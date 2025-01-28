import {SignInForm, SignUpForm} from "@/src/features/components/sign/Form";
import Link from "next/link";

const SwitchPage = ({type} : {type: string}) => {
    return (
        <div className="w-full flex justify-end">
            {
                type == "signin" ?
                    <span className="text-sm">Don't have an account yet?
                        <Link className="font-bold" href="/sign/signup"> Sign up</Link></span>
                    :
                    <span>Already have an account?
                        <Link className="font-bold" href="/sign/signin"> Sign in</Link></span>
            }
        </div>
    )
}


export default async function SignPage({ params }: { params: Promise<{ type: string }>}) {

    const {type} = await params;

    return (
        <>
            <SwitchPage type={type} />
            {type == "signin" ? <SignInForm /> : <SignUpForm />}
        </>
    )
}