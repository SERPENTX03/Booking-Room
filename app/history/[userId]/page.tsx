
import { cancelBooking, fetchBookingsByUserId } from "@/actions/Booking";
import { usePathname } from "next/navigation";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-200 text-yellow-800",
  CONFIRMED: "bg-green-200 text-green-800",
  CHECKED_IN: "bg-blue-200 text-blue-800",
  COMPLETED: "bg-gray-200 text-gray-800",
  CANCELLED: "bg-red-200 text-red-800",
};

export default async function BookingDetail({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;


  if (!userId) {
    return <p className="text-red-500">ไม่พบ User ID</p>;
  }

  const response = await fetchBookingsByUserId(userId);
  console.log("Response:", response);

  if (response.error) {
    return <p className="text-red-500">{response.error}</p>;
  }

  const bookings = response.data ?? [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ประวัติการจองของผู้ใช้</h1>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking.id} className="mb-6 p-4 border rounded shadow">
            <p><strong>ชื่อผู้จอง:</strong> {booking.name}</p>
            <p><strong>ชื่อห้อง:</strong> {booking.room?.name ?? "ไม่มีข้อมูล"}</p>
            <p><strong>วันที่เช็คอิน:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
            <p><strong>เบอร์โทรศัพท์:</strong> {booking.phoneNumber}</p>
            <p>
              <strong>สถานะ:</strong>
              <span className={`ml-2 px-2 py-1 rounded ${statusColors[booking.status]}`}>
                {booking.status}
              </span>
            </p>
            {booking.status !== "CANCELLED" && booking.status !== "COMPLETED" && (
               <form action={cancelBooking}>
               <input type="hidden" name="bookingId" value={booking.id} />
               <button
                 type="submit"
                 className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
               >
                 ยกเลิกการจอง
               </button>
             </form>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">ไม่พบประวัติการจองของผู้ใช้นี้</p>
      )}
    </div>
  );
}
