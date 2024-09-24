import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flight, FlightDocument } from './schema/flight.schema';
import { Booking, BookingDocument } from './schema/booking.schema';
import { CreateFlightDto } from './dto/create-flight.dto';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(Flight.name) private flightModel: Model<FlightDocument>,
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  // Method to search flights
  async searchFlights(
    departureCity: string,
    arrivalCity: string,
    date: Date,
  ): Promise<Flight[]> {
    return this.flightModel
      .find({
        departureCity,
        arrivalCity,
        departureTime: { $gte: new Date(date) },
      })
      .exec();
  }

  async bookFlight(flightNumber: string, userId: string): Promise<Booking> {
    const session = await this.flightModel.db.startSession();
    session.startTransaction();

    try {
      const flight = await this.flightModel
        .findOne({ flightNumber: flightNumber })
        .session(session);

      if (!flight) {
        throw new NotFoundException('Flight not found');
      }

      if (flight.seatsAvailable <= 0) {
        throw new Error('No seats available for this flight');
      }

      // Deduct seat availability
      flight.seatsAvailable -= 1;
      await flight.save({ session });

      console.log(flight);
      // Create booking record
      const booking = new this.bookingModel({
        flightId: flight.id,
        userId,
        bookingDate: new Date(),
      });
      await booking.save({ session });

      await session.commitTransaction();
      return booking;
    } catch (error) {
      await session.abortTransaction();
      throw error; // Rethrow the error to be handled by the controller
    } finally {
      session.endSession();
    }
  }

  async createFlight(createFlightDto: CreateFlightDto): Promise<Flight> {
    const departureDate = new Date(createFlightDto.departureTime);
    const arrivalDate = new Date(createFlightDto.arrivalTime);

    if (departureDate <= new Date()) {
      throw new BadRequestException('Departure time must be in the future.');
    }

    if (arrivalDate <= departureDate) {
      throw new BadRequestException(
        'Arrival time must be after departure time.',
      );
    }

    if (createFlightDto.seatsAvailable <= 0) {
      throw new BadRequestException(
        'Seats available must be greater than zero.',
      );
    }

    const existingFlight = await this.flightModel.findOne({
      flightNumber: createFlightDto.flightNumber,
    });
    if (existingFlight) {
      throw new BadRequestException('Flight number already exists.');
    }

    const flightData = {
      ...createFlightDto,
      departureTime: departureDate,
      arrivalTime: arrivalDate,
    };

    const flight = new this.flightModel(flightData);
    return flight.save();
  }
}
