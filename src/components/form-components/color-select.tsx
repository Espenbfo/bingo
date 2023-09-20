import { InputHTMLAttributes } from "react"
import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";
import { FormValues } from "./common";
import "./color-select.css"
type Props = InputHTMLAttributes<HTMLInputElement> & {
    label: Path<FormValues>;
    register: UseFormRegister<FormValues>
}
export const ColorSelect = ({ register, label }: Props) => {
    return (<div className="wrapper">
        {label}
        <input type="color"{...register(label)} />
    </div>)
}