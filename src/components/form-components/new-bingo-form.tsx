import clsx from "clsx";
import "./new-bingo-form.css"
import { useFieldArray, useForm } from "react-hook-form";
import { InputField } from "./input-field";
import { FormValues, schema } from "./common";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColorSelect } from "./color-select";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { BingoData } from "../../common-types";
type Props = {};

const formDataToBingoData = (data: FormValues): BingoData => {
    return {
        title: data.title,
        backgroundColor: data.backgroundColor,
        textColor: data.textColor,
        option: data.option.map(val => val.value)
    }
}
export const NewBingoForm = ({ }: Props) => {
    let [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const defaultOptions = searchParams.getAll("option")

    const defaultBackgroundColorSearchParam = searchParams.get("backgroundColor")

    const defaultTextColorSearchParam = searchParams.get("textColor")

    const defaultTitle = searchParams.get("title")




    const { register, handleSubmit, watch, formState: { errors }, control } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            backgroundColor: defaultBackgroundColorSearchParam ?? "",
            textColor: defaultTextColorSearchParam ?? "",
            option: defaultOptions.length ? defaultOptions.map(val => ({ value: val })) : [],
            title: defaultTitle ?? ""
        }
    });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "option", // unique name for your Field Array
    });

    const onSubmit = (data: any) => {
        console.log(data)
        navigate({ pathname: "/bingo", search: `?${createSearchParams(formDataToBingoData(data))}` })
    }

    console.log()

    return (
        <form className={clsx("main-form")} onSubmit={handleSubmit(onSubmit)}>
            <h1 className="section-title">New bingo form</h1>

            <h3 className="section-title">Title</h3>
            <input {...register("title")} />
            <h3 className="section-title">Color theme</h3>

            <ColorSelect register={register} label="backgroundColor" />
            <ColorSelect register={register} label="textColor" />

            <h3 className="section-title">Add bingo option</h3>
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

            <button onClick={() => append({ value: "" })}>Add option</button>
            <input type="submit" />
        </form>
    );
}