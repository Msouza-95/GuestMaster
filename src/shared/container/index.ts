
import BookingRepository from 'module/booking/infra/typeorm/repositories/booking.repository';
import IBookingRepository from 'module/booking/repositories/I-booking-repository';
import GuestRepository from 'module/guest/infra/typeorm/repositories/guest.repository';
import IGuestRepository from 'module/guest/repositories/I-guest-repository';
import HotelRepository from 'module/hotel/infra/typeorm/repositories/hotel.repository';
import IHotelRepository from 'module/hotel/repositories/I-hotel-repository';
import RoomRepository from 'module/room/infra/typeorm/repositories/room.repository';
import IRoomRepository from 'module/room/repositories/I-room-repository';
import CreateRoomUseCase from 'module/room/use-cases/create-room';
import UserRepository from 'module/user/infra/typeorm/repositories/user.repository';
import IUserRepository from 'module/user/repositories/I-user-repository';
import { container } from 'tsyringe';

// registra no cotainer singleton os repository e suas asinaturas
container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository
);

container.registerSingleton<IRoomRepository>(
  'RoomRepository',
  RoomRepository
);

container.registerSingleton<IGuestRepository>(
  'GuestRepository',
  GuestRepository
);

container.registerSingleton<IBookingRepository>(
  'BookingRepository',
  BookingRepository
);

container.registerSingleton<IHotelRepository>(
  'HotelRepository',
  HotelRepository
);


