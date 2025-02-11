"use server"

import prisma from "@/lib/db";
import { error } from "console";

export const fetchRooms = async()=>{
    try {

        const rooms = await prisma.room.findMany()

        return rooms
    } catch (error) {
        console.error({error: "Fetchrooms Error"},error);
        throw Error("Fetch room error!!")

    }
}

export const fetchRoomById = async (roomId: string) => {
    try {
      const room = await prisma.room.findUnique({
        where: { id: roomId },
      });
  
      if (!room) {
        console.warn(`Room with ID ${roomId} not found`);
        return null; // ส่งคืน null แทนการโยน Error
      }
  
      return room;
    } catch (error) {
      console.error("Fetching Room By ID Error:", error);
      return null;
    }
  };
  

export const fetchAvailbleRooms = async ()=>{
    try {
        const availableRooms = await prisma.room.findMany({
            where:{
                isAvailable: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        if(!availableRooms)
          return {error: "Fail availableRooms"}

        return availableRooms
        
    } catch (error) {
        console.error("Error fetching available rooms")
        throw new Error( "Failed to fetch availble rooms")
    }
}


// ฟังก์ชันสำหรับสลับสถานะ isAvailable
export async function toggleRoomAvailability(roomId: string) {
  try {
    const room = await prisma.room.findUnique({ where: { id: roomId } });

    if (!room) throw new Error("Room not found");

    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: { isAvailable: !room.isAvailable }, // สลับสถานะจาก true -> false หรือ false -> true
    });

    return updatedRoom;
  } catch (error) {
    console.error("Error toggling room availability:", error);
    throw new Error("Failed to toggle room availability");
  }
}
