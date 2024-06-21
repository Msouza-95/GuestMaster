import { z } from "zod";

export const  CreaHotelDTO = z.object({
 name : z.string(),
 address:z.string(),
 description: z.string()
})


export type CreaHotelDTO = z.infer<typeof CreaHotelDTO>
