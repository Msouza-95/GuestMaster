import { z } from "zod";

export const SessionUserDTO = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});


export type SessionUserDTO = z.infer<typeof SessionUserDTO>;
