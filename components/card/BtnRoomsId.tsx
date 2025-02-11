import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type BtnProps = {
  className?: string; // เพิ่ม `?` เพื่อให้ `className` เป็น optional
  name?: string;
  roomsId: string;
};

const BtnRoomsId = ({ className, name, roomsId}: BtnProps) => {
  return (
    <Link href={`/rooms/${roomsId}`}>
      <Button className={className}>{name}</Button>;
    </Link>
  );
};

export default BtnRoomsId;
