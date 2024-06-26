import { z } from "zod";

export const CreateGuestDTO  = z.object({
 fullname : z.string(),
 email: z.string().email(),
 phone: z.string(),
 birthdayDate: z.string().date(),
 city :z.string(),
 state: z.string(),
 country: z.string(),
})



export type CreateGuestDTO = z.infer<typeof CreateGuestDTO>
