import { getRandomInt } from '../../../application/helpers/functions/getRandomNumber';
import { Parking } from '../../../application/domain/models';

export class ParkingBuilder {
  private plateNumber = getRandomInt(1000, 9999);

  private parking: Parking[] = [];
  private reservation: Parking = {
    id: Date.now(),
    plate: `ABC-${this.plateNumber}`,
    time: '',
    paid: false,
    left: false,
    created: new Date()
  };

  constructor() {
    this.parking.push(this.reservation);
  }

  public static aReservation() {
    return new ParkingBuilder();
  }

  public withInvalidPlate() {
    this.reservation.plate = 'AAA-AAAA';
    return this.reservation;
  }

  public withFieldPaidEqualToTrue() {
    this.reservation.paid = true;
    return this.reservation;
  }

  public getReservation() {
    return this.reservation;
  }

  public getParking() {
    return this.parking;
  }
}
