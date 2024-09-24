import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FlightService } from './flight.service';
import { Flight } from './schema/flight.schema';
import { GetCurrentUser, Public } from 'src/shared/decorators';
import { Booking } from './schema/booking.schema';

@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  // Endpoint to search for flights
  @Get('search')
  @Public()
  async searchFlights(
    @Query('departureCity') departureCity: string,
    @Query('arrivalCity') arrivalCity: string,
    @Query('date') date: string,
  ): Promise<Flight[]> {
    return this.flightService.searchFlights(
      departureCity,
      arrivalCity,
      new Date(date),
    );
  }

  @Post(':flightId')
  async bookFlight(
    @Param('flightId') flightId: string,
    @GetCurrentUser('sub') userId: string,
  ): Promise<Booking> {
    console.log(userId);
    return this.flightService.bookFlight(flightId, userId);
  }
}
