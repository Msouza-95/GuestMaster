import { DeleteResult } from "typeorm";
import { CreateRoomDTO } from "../dtos/create-room-DTO";
import { Room } from "../infra/typeorm/entities/room.entity";

export interface IFindByTypeRoom{
  room_type : string
  hotel_id : string
}

export default interface IRoomRepository {
  createRoom(data: CreateRoomDTO): Promise<Room>;
  show(): Promise<Room[]>;
  saveRoom(room: Room): Promise<Room>;
  findById(room_id: string): Promise<Room | null>;
  findByType({room_type, hotel_id}: IFindByTypeRoom): Promise<Room []>
  findByHotelID(hotel_id: string): Promise<Room [] >
  deleteRoom(room_id: string): Promise<DeleteResult>
}
