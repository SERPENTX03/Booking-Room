import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const { roomId } = await req.json();

  console.log(roomId)

  try {
    const room = await prisma.room.findUnique({ where: { id: roomId } });
    if (!room) return NextResponse.json({ error: "Room not found" }, { status: 404 });

    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: { isAvailable: !room.isAvailable },
    });

    return NextResponse.json(updatedRoom);
  } catch (error) {
    console.error("Error toggling room availability:", error);
    return NextResponse.json({ error: "Failed to update room status" }, { status: 500 });
  }
}
