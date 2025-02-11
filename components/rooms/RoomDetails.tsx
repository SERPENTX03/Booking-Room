import React from "react";

type RoomDetailProps = {
  name: string;
  price: number;
  capacity: number;
  description: string;
  isAvailable: boolean;
};

const RoomDetail = ({ name, price, capacity, description, isAvailable }: RoomDetailProps) => {
  return (
    <div className="w-full md:w-1/2">
      <h1 className="text-3xl font-bold mb-4">{name}</h1>
      <p className="text-lg mb-2">{`Price: ${price}B`}</p>
      <p className="text-lg mb-2">{`Capacity: ${capacity} people`}</p>
      <p className="text-gray-700 mt-4">{description}</p>
      <p className={`mt-4 text-sm ${isAvailable ? "text-green-600" : "text-red-600"}`}>
        {isAvailable ? "Available" : "Unavailable"}
      </p>
    </div>
  );
};

export default RoomDetail;
