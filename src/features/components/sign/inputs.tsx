"use client";
import React, {ChangeEvent, useState} from "react";

export function SignInput(
    {name, type, holder, onchange} : {name: string, type: string, holder?: string, onchange?: (e: React.FormEvent<HTMLInputElement>) => void}) {
    return <div>
        <label className="font-medium">{name}</label>
        <input
            type={type}
            name={name}
            onChange={onchange}
            placeholder={holder}
            className="w-full p-1 px-4 text-[16px] border border-grey rounded-lg my-2 outline-blue" />
    </div>
}

export function SignBtn({name} : {name: string}) {
    return <button className="w-full p-2 bg-blue text-white rounded-lg mt-4 mb-10">
        {name}
    </button>
}

export function FileInput({name} : {name: string}) {

    const [picture, setPicture] = useState<string | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file); // Génère une URL temporaire
            setPicture(imageUrl);
        }
    };

    return (
        <div style={{backgroundImage: picture ? `url(${picture})`: ''}}
            className="relative flex items-center justify-center w-44 h-44 outline-blue
                outline-2 outline-dashed rounded hover:bg-blue_light cursor-pointer
                bg-cover bg-center">
            <input
                name={name}
                onChange={handleFileChange}
                type="file"
                className="absolute w-full h-full cursor-pointer opacity-0"
                accept="image/*"
            />
            <h1 className="text-blue">{name}</h1>
        </div>
    )
}