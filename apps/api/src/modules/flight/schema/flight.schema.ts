import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FlightDocument = HydratedDocument<Flight>;

@Schema()
export class Flight {
  @Prop({
    required: true,
    type: String,
  })
  flightNumber: string;

  @Prop({
    required: true,
    type: String,
  })
  airline: string;

  @Prop({
    required: true,
    type: String,
  })
  departureCity: string;

  @Prop({
    required: true,
    type: String,
  })
  arrivalCity: string;

  @Prop({
    required: true,
    type: Date,
  })
  departureTime: Date;

  @Prop({
    required: true,
    type: Date,
  })
  arrivalTime: Date;

  @Prop({
    required: true,
    type: Number,
  })
  price: number;

  @Prop({
    required: true,
    type: Number,
  })
  seatsAvailable: number;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
