import { Repository } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm/dataSource";
import IUserRepository from "module/user/repositories/I-user-repository";
import { Room } from "../entities/room.entity";
import IRoomRepository from "module/room/repositories/I-room-repository";
import { CreateRoomDTO } from "module/room/dtos/create-room-DTO";







class RoomRepository extends Repository<Room>  implements IRoomRepository{
  constructor() {
      super(Room, AppDataSource.manager);
  }

  //  cria e salva um user no banco
  public async createRoom(data: CreateRoomDTO): Promise<Room>{

    const room = this.create(data)

    await this.save(room)

    return room

  }

  public async saveRoom(room: Room): Promise<Room> {

    const updateRoom = await this.save(room)

    return updateRoom
  }

  public async show(): Promise <Room[]> {
    const rooms = await this.find()

    return rooms
  }


  public async findById(user_id: string): Promise<Room | null> {
    const room =await this.findOneBy({id: user_id})

    return room
  }


  public async findByType(room_type: string): Promise<Room | null> {
    const room = await this.findOneBy({ room_type });

    return room
  }
}

export default RoomRepository
