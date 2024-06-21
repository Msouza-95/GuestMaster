import { z } from "zod";

export const  UpdateHotelDTO = z.object({
 name : z.string(),
 address:z.string(),
 description: z.string(),
 hotel_id : z.string().uuid()})


export type UpdateHotelDTO = z.infer<typeof UpdateHotelDTO>
