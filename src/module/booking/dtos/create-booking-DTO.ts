import {  z } from "zod";

export enum statusBookingEnum {
  CONFIRMADA = 'Confirmada',
  CANCELADA = 'Cancelada',
  CHECK_IN = 'Check-in',
  CHECK_OUT = 'Check-out',
}

export const CreateBookingDTO = z.object({
 start_date_booking : z.string().date(),
 end_date_booking : z.string().date(),
 total_price: z.number(),
 hotel_id: z.string().uuid(),
 guest_id: z.string().uuid(),
 room_id: z.string().uuid(),
})



export type CreateBookingDTO = z.infer<typeof CreateBookingDTO>
