import clsx from "clsx";
import "./new-bingo-form.css"
import { useFieldArray, useForm } from "react-hook-form";
import { InputField } from "./input-field";
import { FormValues, schema } from "./common";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColorSelect } from "./color-select";

type Props = {};

export const NewBingoForm = ({ }: Props) => {
    const { register, handleSubmit, watch, formState: { errors }, control } = useForm<FormValues>({
        resolver: zodResolver(schema)
    });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "option", // unique name for your Field Array
    });

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <form className={clsx("main-form")} onSubmit={handleSubmit(onSubmit)}>
            <ColorSelect register={register} label="backgroundColor" />
            <ColorSelect register={register} label="textColor" />

            <div>Add bingo option</div>
            <div className="bingo-fields-section">
                {fields.map((field, index) => (
                    <InputField
                        name={`Option ${index + 1}`}
                        onRemove={() => remove(index)}
                        key={field.id} // important to include key with field's id
                        label={`option.${index}.value`}
                        register={register}
                        required={true}
                        errorMessage={errors.option?.[index] ? errors.option[index]?.value?.message ?? "" : ""}
                    />
                ))}
            </div>
            {errors.option?.root ? errors.option.root.message : false}

            <button onClick={() => append({ value: "" })}>Append</button>
            <button onClick={() => remove()}>Remove all</button>
            <input type="submit" />
        </form>
    );
}