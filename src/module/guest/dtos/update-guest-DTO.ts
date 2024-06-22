import { z } from "zod";

export const UpdateGuestDTO  = z.object({
 fullname : z.string(),
 email: z.string().email(),
 phone: z.string(),
 birthdayDate: z.string().date(),
 city :z.string(),
 state: z.string(),
 country: z.string(),
 guest_id: z.string().uuid()
})



export type UpdateGuestDTO = z.infer<typeof UpdateGuestDTO>
