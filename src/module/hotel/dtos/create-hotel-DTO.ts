import { z } from "zod";

export const  CreateHotelDTO = z.object({
 name : z.string(),
 address:z.string(),
 description: z.string()
})


export type CreateHotelDTO = z.infer<typeof CreateHotelDTO>
