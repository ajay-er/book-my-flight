import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Flight, FlightSchema } from './schema/flight.schema';
import { Booking, BookingSchema } from './schema/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }]),
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
  ],
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
