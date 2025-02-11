"use client";
import React, { useState, useEffect } from "react";
import { fetchAllBooking, updateBookingStatus } from "@/actions/Booking";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Define the Booking type
type Booking = {
  id: string;
  name: string;
  roomName: string;
  phoneNumber: string;
  checkIn: string;  // Date string format
  status: "PENDING" | "CONFIRMED" | "CHECKED_IN" | "COMPLETED" | "CANCELLED";
};

const statusOptions: Booking["status"][] = ["PENDING", "CONFIRMED", "CHECKED_IN", "COMPLETED", "CANCELLED"];

const statusColors: Record<Booking["status"], string> = {
  PENDING: "bg-yellow-200 text-yellow-800",
  CONFIRMED: "bg-green-200 text-green-800",
  CHECKED_IN: "bg-blue-200 text-blue-800",
  COMPLETED: "bg-gray-200 text-gray-800",
  CANCELLED: "bg-red-200 text-red-800",
};

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await fetchAllBooking();
        const formattedData: Booking[] = data.map((booking) => ({
          ...booking,
          checkIn: booking.checkIn.toISOString(),
        }));
        setBookings(formattedData);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusChange = async (bookingId: string, newStatus: Booking["status"]) => {
    try {
      const response = await updateBookingStatus(bookingId, newStatus);
      if (response.success) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId ? { ...booking, status: newStatus } : booking
          )
        );
        alert(`Status updated to ${newStatus}`);
      } else {
        alert(response.error || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred while updating the status.");
    }
  };

  return (
    <section className="p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="p-4 space-y-2">
            <h2 className="text-lg font-bold">{booking.name}</h2>
            <p>
              <strong>Room:</strong> {booking.roomName}
            </p>
            <p>
              <strong>Phone:</strong> {booking.phoneNumber}
            </p>
            <p>
              <strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong>
              <span className={`ml-2 px-2 py-1 rounded ${statusColors[booking.status]}`}>
                {booking.status}
              </span>
            </p>
            <div>
              <Label>Status:</Label>
              <Select
                defaultValue={booking.status}
                onValueChange={(newStatus: Booking["status"]) => handleStatusChange(booking.id, newStatus)}
              >
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Bookings;
