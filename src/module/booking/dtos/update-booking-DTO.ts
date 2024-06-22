import {  z } from "zod";
import { statusBookingEnum } from "./create-booking-DTO";


export const UpdateBookingDTO = z.object({
 start_date_booking : z.string().date(),
 end_date_booking : z.string().date(),
 total_price: z.number(),
 status: z.enum([statusBookingEnum.CANCELADA, statusBookingEnum.CONFIRMADA
  ,statusBookingEnum.CHECK_IN,statusBookingEnum.CHECK_OUT]),
 hotel_id: z.string().uuid(),
 guest_id: z.string().uuid(),
 room_id: z.string().uuid(),
})



export type UpdateBookingDTO = z.infer<typeof UpdateBookingDTO>
