import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFlightDto {
  @IsNotEmpty()
  @IsString()
  flightNumber: string;

  @IsNotEmpty()
  @IsString()
  airline: string;

  @IsNotEmpty()
  @IsString()
  departureCity: string;

  @IsNotEmpty()
  @IsString()
  arrivalCity: string;

  @IsNotEmpty()
  @IsString()
  departureTime: Date;

  @IsNotEmpty()
  @IsString()
  arrivalTime: Date;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  seatsAvailable: number;
}
