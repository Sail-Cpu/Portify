import ProviderBtn from "@/src/features/components/sign/ProviderBtn";
import GoogleLogo from "@/src/assets/google.png"
import GithubLogo from "@/src/assets/github.png"
import React from "react";

export default async function SignLayout({children}: Readonly<{ children: React.ReactNode; }>) {

    return(
        <div className="w-full min-h-screen flex items-center">
            <div className="w-full flex flex-col items-center">
                <h1 className="mb-6 text-2xl font-semibold">Sign in to your account</h1>
                <div className="w-2/5 min-w-96 max-w-lg p-12 bg-white border-2 rounded shadow-sm">
                    {children}
                    <div
                        className="w-full border-t border-grey pt-10 flex items-center justify-between">
                        <ProviderBtn logo={GoogleLogo} title="Google" />
                        <ProviderBtn logo={GithubLogo} title="Github" />
                    </div>
                </div>
            </div>
        </div>
    )
}