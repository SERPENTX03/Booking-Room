import { auth } from "@/auth";
import FormBooking from "@/components/booking/FormBooking";
import { fetchRoomById } from "@/actions/Rooms";
import { redirect } from "next/navigation";
import React from "react";

const BookingPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/auth/register");
  }

  const room = await fetchRoomById(id);
  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div>
      <FormBooking userId={user.id || ''} roomId={room.id} roomName={room.name} />
    </div>
  );
};

export default BookingPage;
