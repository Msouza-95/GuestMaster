import { z } from "zod";


export enum typeRoomEnum {
  MASTER = 'Master',
  STANDARD = 'Standard',
  SOLTEIRO = 'Solteiro',
  CASAL = 'Casal',
}

export enum statusRoomEnum {
  OCUPADO = 'Ocupado',
  LIVRE = 'Livre',
}


export const  CreateRoomDTO = z.object({
 room_number : z.string(),
 room_type:z.enum([typeRoomEnum.CASAL, typeRoomEnum.MASTER,
  typeRoomEnum.SOLTEIRO, typeRoomEnum.STANDARD]),
 status: z.enum([statusRoomEnum.LIVRE, statusRoomEnum.OCUPADO]),
 hotel_id: z.string().uuid()
})


export type CreateRoomDTO = z.infer<typeof CreateRoomDTO>
