import { Card } from "../ui/card";
import Image from "next/image";
import { fetchRooms } from "@/actions/Rooms";
import ToggleButton from "./form/ToggleButton"; // Import ToggleButton

const AvailableAdmin = async () => {
  const rooms = await fetchRooms();

  return (
    <section className="mt-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rooms.map((room) => (
            <Card key={room.id}>
              <div className="relative w-full h-[270px] md:h-[370px]">
                <Image
                  src={room.images[0] || "/image/room1.jpg"}
                  alt={`Room ${room.id}`}
                  width={400}
                  height={100}
                  className="object-cover relative rounded-t-lg"
                />
                <span className={`absolute top-0 right-0 m-2 text-white px-2 rounded-xl ${room.isAvailable ? "bg-green-500" : "bg-red-500"}`}>
                  {room.isAvailable ? "ว่าง" : "เต็ม"}
                </span>

                <p className="text-slate-700 text-sm mt-2">{room.description}</p>
                <div className="flex px-2 justify-between w-full absolute bottom-4">
                  <h2>{room.price}B</h2>
                  <p>{`จำนวนคน ${room.capacity}`}</p>
                </div>
              </div>
              <div className="px-2 py-4">
                <ToggleButton roomId={room.id} isAvailable={room.isAvailable} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvailableAdmin;
