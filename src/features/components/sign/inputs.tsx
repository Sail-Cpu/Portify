import React, {FormEvent} from "react";

export function SignInput(
    {name, type, holder, onchange} : {name: string, type: string, holder?: string, onchange?: (e: React.FormEvent<HTMLInputElement>) => void}) {
    return <div>
        <label className="font-medium">{name}</label>
        <input
            type={type}
            name={name}
            onChange={onchange}
            placeholder={holder}
            className="w-full p-1 px-4 text-lg border border-grey rounded-lg my-2 outline-blue" />
    </div>
}

export function SignBtn({name} : {name: string}) {
    return <button className="w-full p-2 bg-blue text-white rounded-lg mt-4 mb-10">
        {name}
    </button>
}