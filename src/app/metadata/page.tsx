import {SignMetadataForm} from "@/src/features/components/sign/Form";

export default async function MetadataPage() {

    return(
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
            <SignMetadataForm />
        </div>
    )
}