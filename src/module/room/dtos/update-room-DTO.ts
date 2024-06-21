import { z } from "zod";
import { statusRoomEnum, typeRoomEnum } from "./create-room-DTO";


export const  UpdateRoomDTO = z.object({
  room_id: z.string(),
  room_number : z.string(),
  room_type:z.enum([typeRoomEnum.CASAL, typeRoomEnum.MASTER,
  typeRoomEnum.SOLTEIRO, typeRoomEnum.STANDARD]),
  status: z.enum([statusRoomEnum.OCUPADO, statusRoomEnum.DISPONIVEL]),
  hotel_id: z.string().uuid()
})


export type UpdateRoomDTO = z.infer<typeof UpdateRoomDTO>
