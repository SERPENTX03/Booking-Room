import { fetchRoomById } from "@/actions/Rooms";
import RoomSwiper from "@/components/rooms/RoomSwiper";
import Navbar from "@/components/navbar/Navbar";
import RoomDetail from "@/components/rooms/RoomDetails";
import BtnConfirm from "@/components/booking/BtnConfirm";

const RoomById = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const room = await fetchRoomById(id);
  return (
    <section className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Room Images */}
          <div className="w-full md:w-1/2">
            <RoomSwiper images={room.images} />
          </div>

          {/* Right: Room Details */}
          <div className="text-center md:text-left">
            <RoomDetail
              name={room.name}
              price={room.price}
              capacity={room.capacity}
              description={room.description ?? ""}
              isAvailable={room.isAvailable}
            />

            <BtnConfirm  roomId={room.id} className="mt-20 w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomById;
