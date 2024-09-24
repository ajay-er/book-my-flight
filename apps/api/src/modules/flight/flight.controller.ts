import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FlightService } from './flight.service';
import { Flight } from './schema/flight.schema';
import { GetCurrentUser, Public } from 'src/shared/decorators';
import { Booking } from './schema/booking.schema';
import { CreateFlightDto } from './dto/create-flight.dto';

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

  @Post('create')
  async createFlight(
    @Body() createFlightDto: CreateFlightDto,
  ): Promise<Flight> {
    return this.flightService.createFlight(createFlightDto);
  }

  @Post(':flightNumber')
  async bookFlight(
    @Param('flightNumber') flightNumber: string,
    @GetCurrentUser('sub') userId: string,
  ): Promise<Booking> {
    return this.flightService.bookFlight(flightNumber, userId);
  }
}
