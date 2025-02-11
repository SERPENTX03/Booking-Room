import Link from "next/link";
import React from "react";

const HistoryBooking = ({ userId }: { userId?: string }) => {
  // if (!bookingId) {
  //   return <p className="text-red-500">ไม่พบประวัติการจอง</p>;
  // }

  return (
    <div className="rounded p-4 shadow-md">
      <Link
        href={`/history/${userId}`}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        ประวัติการจอง
      </Link>
    </div>
  );
};

export default HistoryBooking;
