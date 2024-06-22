import {  z } from "zod";

export const CheckBookingDTO = z.object({

 guest_id: z.string().uuid(),
 booking_id: z.string().uuid()
})



export type CheckBookingDTO = z.infer<typeof CheckBookingDTO>
