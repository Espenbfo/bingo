import { InputHTMLAttributes } from "react"
import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";
import { FormValues } from "./common";
import "./input-field.css"
type Props = InputHTMLAttributes<HTMLInputElement> & {
    onRemove: () => void;
    label: Path<FormValues>;
    register: UseFormRegister<FormValues>;
    required: boolean;
    name: string;
    errorMessage: string;
}
export const InputField = ({ onRemove, register, label, required, name, errorMessage, ...rest }: Props) => {
    console.log(errorMessage)
    return (<div className="wrapperwrapper"><div className="wrapper">
        <div>{name}</div>
        <input
            {...rest}
            {...register(label, { required })}

        />
        <button onClick={onRemove}>Remove</button>
    </div>
        <div className="error-message">{errorMessage}</div>
    </div>)
}