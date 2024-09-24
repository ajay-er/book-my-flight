import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookingDocument = HydratedDocument<Booking>;

@Schema()
export class Booking {
  @Prop({ required: true })
  flightId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, type: Date })
  bookingDate: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
