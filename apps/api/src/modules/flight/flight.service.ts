import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flight, FlightDocument } from './schema/flight.schema';
import { Booking, BookingDocument } from './schema/booking.schema';

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

  async bookFlight(flightId: string, userId: string): Promise<Booking> {
    const session = await this.flightModel.db.startSession();
    session.startTransaction();

    try {
      const flight = await this.flightModel.findById(flightId).session(session);

      if (!flight) {
        throw new NotFoundException('Flight not found');
      }

      if (flight.seatsAvailable <= 0) {
        throw new Error('No seats available for this flight');
      }

      // Deduct seat availability
      flight.seatsAvailable -= 1;
      await flight.save({ session });

      // Create booking record
      const booking = new this.bookingModel({
        flightId,
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
}
