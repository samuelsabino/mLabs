export interface Parking {
  id: number;
  plate: string;
  time: string;
  paid: boolean;
  left: boolean;
  created?: Date;
}
