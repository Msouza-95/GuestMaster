import { z } from "zod";

export const CreateUserDTO = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
});


export type CreateUserDTO = z.infer<typeof CreateUserDTO>;
