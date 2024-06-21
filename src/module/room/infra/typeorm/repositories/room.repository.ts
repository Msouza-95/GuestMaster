import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm/dataSource";
import IUserRepository from "module/user/repositories/I-user-repository";
import { Room } from "../entities/room.entity";
import IRoomRepository, { IFindByTypeRoom } from "module/room/repositories/I-room-repository";
import { CreateRoomDTO } from "module/room/dtos/create-room-DTO";



class RoomRepository extends Repository<Room>  implements IRoomRepository{
  constructor() {
      super(Room, AppDataSource.manager);
  }

  //  cria e salva um room no banco
  public async createRoom(data: CreateRoomDTO): Promise<Room>{


      /* converte os type enum para string,
       pois o  sql serve não aceita type enum */
    const room = this.create({
      // status: String(data.status),
      room_type: String(data.room_type),
      room_number: data.room_number,
      hotel_id: data.hotel_id,
    })

    // save no banco
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


  public async findByType({room_type, hotel_id}: IFindByTypeRoom): Promise<Room []> {
    // retorna todos os quarto pelo um determinado hotel
    const rooms = await this.find({where:{hotel_id, room_type}});

    return rooms
  }

  // todos os quartp de um hotel
  public async findByHotelID(hotel_id: string): Promise<Room[]> {
    const rooms = await this.find({ where:{ hotel_id}});

    return rooms
  }

  public async deleteRoom(room_id: string): Promise<DeleteResult>{
    const result = await this.delete({id:room_id})

    return result
  }

}

export default RoomRepository
