export type TRoom = {
  name: string;
  roomNo: number;
  floorNo: number;
  pricePerSlot: number;
  amenities: [string];
  isDeleted: boolean;
  capacity: number;
  images: [string];
};

export interface RoomFilterPayload {
  price?: number;
  capacity?: number;
  search?: string;
  sort?: "ascending" | "descending";
}
