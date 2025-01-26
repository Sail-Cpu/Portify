import {SignBtn, SignInput} from "@/src/features/components/sign";

export default function page(){
    return(
        <form className="w-full">
            <SignInput name="Email" type="email" />
            <SignInput name="Password" type="password" />
            <SignBtn name="Sign in" />
        </form>
    )
}