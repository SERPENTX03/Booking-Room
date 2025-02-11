"use server";
import prisma from "@/lib/db";

export const createBooking = async (_prevState: any, formData: FormData) => {
  try {
    const userId = formData.get("userId") as string;
    const name = formData.get("name") as string;
    const roomId = formData.get("roomId") as string;
    const checkIn = formData.get("checkIn") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const roomName = formData.get("roomName") as string;

    if (!name || !roomId || !checkIn || !phoneNumber || !roomName || !userId) {
      return { error: "กรุณากรอกข้อมูลให้ครบถ้วน" };
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        roomId,
        roomName,
        checkIn: new Date(checkIn),
        phoneNumber,
        name,
        status: "PENDING",
      },
    });

    return {
      success: true,
      data: booking,
    };
  } catch (error) {
    console.error("Failed to create booking:", error);
    return {
      success: false,
      error: "Failed to create booking",
    };
  }
};

export const fetchAllBooking = async () => {
  try {
    const bookings = await prisma.booking.findMany();
    return bookings;
  } catch (error) {
    console.error({ error: "Fitching booking all error" }, error);
    throw new Error("Failed to fitching !!!");
  }
};

export const updateBookingStatus = async (
  bookingId: string,
  newStatus: string
) => {
  try {
    const validStatuses = [
      "PENDING",
      "CONFIRMED",
      "CHECKED_IN",
      "COMPLETED",
      "CANCELLED",
    ];

    if (!validStatuses.includes(newStatus)) {
      return { error: "Invalid booking status" };
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: newStatus as any }, // ใช้ newStatus แทน "PENDING"
    });

    return {
      success: true,
      data: updatedBooking,
    };
  } catch (error) {
    console.error("Failed to update booking status:", error);
    return {
      success: false,
      error: "Failed to update booking status",
    };
  }
};

export const fetchBookingsByUserId = async (userId: string) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: userId },
      include: {
        room: true, //ดึงข้อมูลห้องเพิ่มถ้ามีความสัมพันธ์กับ room
      },
    });

    if (bookings.length === 0) {
      return { error: "ไม่พบประวัติการจองของผู้ใช้นี้" };
    }

    return {
      seccess: true,
      data: bookings,
    };
  } catch (error) {
    console.error("Fetching Booking Error", error);
    return {
      seccess: false,
      error: "Failed fetching booking by Id",
    };
  }
};




export const cancelBooking = async (formData: FormData) => {
  const bookingId = formData.get("bookingId") as string;

  
 if (!bookingId ) {
    return { success: false, error: "Booking ID and User ID are required" };
  }

  try {
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "CANCELLED" },
    });

    return {
      success: true,
      data: updatedBooking,
    };

    
  } catch (error) {
    console.error("Failed to cancel booking:", error);
    return {
      success: false,
      error: "Failed to cancel booking",
    };
  }
};
