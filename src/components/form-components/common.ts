import { z } from "zod";


export const schema = z.object({
    title: z.string(),
    backgroundColor: z.string(),
    textColor: z.string(),
    option: z.array(z.object({
        value: z.string().nonempty()
    })).min(16)
})

export type FormValues = z.infer<typeof schema>;