import { CreateRoomDTO } from "../dtos/create-room-DTO";
import { Room } from "../infra/typeorm/entities/room.entity";



export default interface IRoomRepository {
  createRoom(data: CreateRoomDTO): Promise<Room>;
  show(): Promise<Room[]>;
  saveRoom(room: Room): Promise<Room>;
  findById(room_id: string): Promise<Room | null>;
  findByType(room_type: string): Promise<Room | null>
}
